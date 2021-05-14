// import checkImg from "../../public/static/images/account-info/check-item.png";
// import SplashScreen from "../splash-screen";
import _ from "lodash";
import { login } from "../../static/auth0";
import { PATRON } from "../../utils/url_constants";
import { sortPlansAccordingPrice, getPlanInfo } from "../../helpers/plans";
import { updateUserInfo } from "../../helpers/getUserData";
import { useRouter } from 'next/router'
import { withAuth0 } from "@auth0/auth0-react";
import { NYA_FREE, NYA_UNLIMITED } from "../../utils/url_constants";
import fetchData from "../../api/fetch";
import Input from "../input";
import LoadingIndicator from '../loading'
import RadioButton from '../radioButton'
import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";


// TODO: Ensure `paymentFail` returns reletive error msg

class Line extends Component {
  render() {
    const available = this.props.available;
    return (
      <div className={`description-line ${available ? "available" : ""}`}>
        <div className="line">
          <div className="plan-checks">
            {available && <img src="/static/images/account-info/check.png" alt="check" width="24px"/>}
          </div>
          <div className="line-text"> {this.props.children}</div>
        </div>
      </div>
    );
  }
}
class CheckBox extends Component {
  render() {
    const { checked, onChange, name } = this.props;
    return (
      <div className="custom-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
        />
        <div className="image" />
      </div>
    );
  }
}

/*
   initial -> select -> paying -> paymentOK
                          +-----> paymentFail -> initial
*/

const PlanBtn = (props) => {
  const {
    isFreePlan,
    userHasThisPlan,
    plan,
    planId,
    checkIfShouldHideButton,
    initialClickPurchase,
    topButton = true,
    userPlanType,
    userAuthenticated,
  } = props;

  let buttonText = plan && plan.buyButtonText;
  buttonText = typeof buttonText === "string" ? buttonText : planId;
  return (
    <div
      className={`button-bottom ${
        topButton ? "plan-button" : "plan-button-bottom"
      }`}
    >
      {!isFreePlan && (
        <div
          className={`button get-plan ${
            !(userHasThisPlan && userAuthenticated)
              ? checkIfShouldHideButton(planId, userAuthenticated, userPlanType)
              : "subscribed"
          }`}
          onClick={() => {
            if (!userAuthenticated) {
              login();
              return;
            }
            if(userHasThisPlan){
              this.props.router.push('/account/subscription')
              return;
            }

            initialClickPurchase(plan, planId);
          }}
        >
          {userHasThisPlan && userAuthenticated ? "MANAGE" : buttonText}
        </div>
      )}
    </div>
  );
};

class PlansPanel extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    //previous const state = props.view === "select" ? "select" : "initial";
    //change this to the state and move the logic to the componentDidMount
    // const state = props.view === "select" ? "select" : (props.view === "confirmation" ? "confirmation" : "initial");

    // const queryCode = props.router.location.query.code;
    this.prorationRequestFinished = false;
    this.state = {
      state: "initial",
      annualPlan: "year",
      acceptedTerms: false,
      //   giftcode: queryCode || "",
      giftcode: "",
      tryOtherPlan: false,
      planNames: {
        "NYA-UNLIMITED": "CLASSIC",
        "NYA-RUST": "RUST",
        "NYA-PATRON": "PATRON",
      },
    };

    this.initialClickPurchase = this.initialClickPurchase.bind(this);
    this.planSelectionOnChange = this.planSelectionOnChange.bind(this);
    this.acceptedTermsOnChange = this.acceptedTermsOnChange.bind(this);
    this.selectGotToken = this.selectGotToken.bind(this);
    this.clickExplore = this.clickExplore.bind(this);
    this.backToPlans = this.backToPlans.bind(this);
    this.giftcodeOnChange = this.giftcodeOnChange.bind(this);
    this.sendCodeHandler = this.sendCodeHandler.bind(this);
    this.goToSelectionScreen = this.goToSelectionScreen.bind(this);
    this.checkIfShouldHideButton = this.checkIfShouldHideButton.bind(this)
    this.loading = this.loading.bind(this)
  }

  componentDidMount() {
    let { plansAvailable } = this.props;
    let planSelected = plansAvailable && plansAvailable[NYA_UNLIMITED];
    if (planSelected)
      this.setState({
        planSelected,
        planId: NYA_UNLIMITED,
        singleRadioButtonRendered: false,
        setAnualRadioButtonData: false,
      });
  }
  componentWillUpdate(newprops /*, newstate*/) {
    if (newprops.userData !== this.props.userData)return;
  }

  componentWillUnmount() {
    clearTimeout(this.emit);
  }
  getContent() {
    return this[this.state.state]();
  }

  renderPlanBenefits(patronBenefits, planBenefitsArr) {
    return (
      <div className="details section">
        {patronBenefits &&
          patronBenefits.map((benefit, idx) => {
            const benefitAvailable = (planBenefitsArr || []).includes(benefit);
            return (
              <div key={idx}>
                <Line
                  key={idx}
                  available = {benefitAvailable}
                >
                  {benefit}
                </Line>
              </div>
            );
          })}
      </div>
    );
  }

  checkIfBenefitOnPlan(benefit, planIDs, plansData, customCheckImages) {
    let checkItemsUI = [];
    let customStyle = customCheckImages ? "custom" : "";
    planIDs.forEach((planID) => {
      let includedBenefit =
        plansData[planID] && plansData[planID].includes(benefit);
      let planIndex = planIDs.indexOf(planID) + 1;
      if (includedBenefit) {
        checkItemsUI.push(
          <div
            className={`check  level-${planIndex} ${customStyle} `}
            key={`plan-${planIndex}`}
          >
            {/* <img
              src={
                customCheckImages
                  ? this.getCustomCheckURL(customCheckImages, planID)
                  : checkImg
              }
            /> */}
          </div>
        );
      }
    });
    return checkItemsUI;
  }

  getCustomCheckURL(customCheckImages, planID) {
    let checkURL = checkImg;
    customCheckImages[planID] && (checkURL = customCheckImages[planID]);
    return checkURL;
  }
  planType(planId) {
    const plan = {
      "NYA-UNLIMITED": "free",
      "NYA-RUST": "rust",
      "NYA-PATRON": "patron",
    };
    return plan[planId];
  }

  renderPlans(plans, planInformation) {
    const user = this.getUserInformation() || {};

    const { userPlanType, isAppleSub } = user;
    const isAuthenticated = this.props.user ? true : false;

    const planItems = [];
    let plansData = [];
    let planIDs = [];
    const patron = plans["NYA-PATRON"];
    const patronPlanBenefits = patron ? patron.planBenefits : [];

    let sortedPlans = sortPlansAccordingPrice(plans);
    Object.keys(sortedPlans).forEach((planId) => {
      let userHasThisPlan = userPlanType.includes(planId);
      let plan = plans[planId];
      let isFreePlan = planId == NYA_FREE;

      let planStyle = this.planType(planId);
      let prices = plan["prices"];
      let planInfo =
        (planInformation.data && getPlanInfo(planInformation.data, planId)) ||
        {};
      plansData.push(planInfo);
      planIDs.push(planId);

      //ITERATE TO CREATE PLAN ITEM
      planItems.push(
        <div className={`pane  ${planStyle}`} key={`plan-${planId}`}>
          <div className="header section">
            <img className="header-image" src={plan.headerURL} />
            <p className="plan-title">{plan.displayName}</p>
          </div>
          <div className="description section plan-description">
            {prices}
            <span className="extra-info">
              {planId == NYA_UNLIMITED ? 'Originally called "Unlimited"' : ""}
            </span>
            <p className={`description-text  ${planStyle}`}>
              {plan.planDescription}
            </p>
            {!isAppleSub && (
              <PlanBtn
                isFreePlan={isFreePlan}
                userHasThisPlan={userHasThisPlan}
                userAuthenticated={isAuthenticated}
                plan={plan}
                planId={planId}
                checkIfShouldHideButton={this.checkIfShouldHideButton}
                initialClickPurchase={this.initialClickPurchase}
                userPlanType={userPlanType}
              />
            )}
          </div>
          {this.renderPlanBenefits(patronPlanBenefits, plan.planBenefits)}
        </div>
      );
      // bottomButtons.push(this.renderGetPlanButtons(isFreePlan, userHasThisPlan, userAuthenticated, plan,planId, false ));
    });

    return (
      <div className="content plansContainer">
        <div className="content initial">{planItems}</div>
        {/* {this.renderPlanBenefits(plan.planBenefits)} */}
        {/* <div className="bottom-buttons">{bottomButtons}</div> */}
      </div>
    );
  }

  getUserInformation() {
    const {
      userPlanId = "NYA-FREE",
      isAppleSub = false,
      userSubscriptionStatus: status = null,
      hasPlanExpired = true,
      userSubType: type = "stripe",
    } = this.props.userData || {};

    const subActive = !hasPlanExpired;

    let userPlanType = userPlanId.split(/\W|_/g);
    userPlanType = `NYA-${userPlanType[userPlanType.length - 1]}`;

    if (userPlanType == "NYA-YEARLY" || userPlanType == "NYA_MONTHLY") {
      userPlanType = "NYA-UNLIMITED";
    }

    return { userPlanType, type, status, subActive, isAppleSub };
  }

  checkIfShouldHideButton(planID, userAuthenticated, planType) {
    let currentPlanName = this.state.planNames[planType] || "NYA-FREE";
    let buttonPlanName = this.state.planNames[planID];
    let className = "";
    if (userAuthenticated) {
      if (
        (currentPlanName == "RUST" && buttonPlanName == "CLASSIC") ||
        (currentPlanName == "PATRON" &&
          (buttonPlanName == "CLASSIC" || buttonPlanName == "RUST"))
      ) {
        className = "hidden";
      }
    }
    return className;
  }
  loading(){
    return(
      <div className="loading">
      <center>
       <LoadingIndicator/>
      </center>
      </div>
    )
  }

  initial() {
    const { plansAvailable, planInformation } = this.props;
    /*
            !auth()?        -> Display all plans 
            NYA -Unlimited ? -> Display only Rust and patreon
            NYA -RUST     ? -> Display only patreon and NYA-unlimited 
            NYA -Patron   ? -> Display only Rust and NYA-unlimited 

        */
    if (_.isEmpty(plansAvailable)) {
      return (
        <div className="loading">
        <center>
         <LoadingIndicator/>
        </center>
        </div>
      );
    } else {
      return <div>{this.renderPlans(plansAvailable, planInformation)}</div>;
    }
  }

  initialClickPurchase(plan, planId) {
    let planToBePurchased = plan && plan.plan[0];
    const user = this.getUserInformation() || {};
    const { userPlanType } = user;
    const { token } = this.props;

    this.setState({
      planSelected: plan,
      planId,
      planToBePurchased,
      annualPlan: planToBePurchased.interval,
      productId: planToBePurchased.product_id,
    });

    // Verify that the plan is different than tha one purchased to enable upgrade/downgrade
    if (token) {
      if (
        planId != "NYA-UNLIMITED" &&
        userPlanType != "NYA-FREE" &&
        planId !== userPlanType
      ) {
        this.setState({
          state: "confirmation",
          screen: "plans",
          view: "select",
        });
      } else {
        this.setState({
          state: "select",
          screen: "plans",
          view: "select",
        });
      }
    } else {
      // Login("/account?screen=plans&view=select");
    }
  }

  async sendCodeHandler() {
    const { giftcode, planToBePurchased } = this.state;
    const { token } = this.props;
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "text/plain",
    };

    // validate that it's 8 digit
    if (token) {
      const request = {
        method: "GET",
        query: `api/subscriptions/gift/${giftcode}`,
        headers,
      };

      const giftRequest = await fetchData(request);
      const planId = await giftRequest.text();

      if(planId){
        if(planId === planToBePurchased.product_id){
          this.setState({ state: "paying" }, async () => {
            const params = {
              method: "PUT",
              query: `api/subscriptions/gift/${giftcode}`,
              headers,
            };

            const redemption = await fetchData(params);
            if (redemption) {
              this.setState({ state: "paymentOK" });
            } else {
              this.setState({
                state: "paymentFail",
                codeNotification: "Gift redemption failed, please contact us",
              });
            }
          });
        } else {
          this.setState({
            tryOtherPlan: true,
            couponPlan: planId,
            codeNotification: `Redeem your coupon on plan ${planId}`,
          });
        }
      }
    }
  }

  _getPurchaseButton() {
    const {
      acceptedTerms,
      annualPlan,
      giftcode,
      planToBePurchased,
      planId,
      chargesPreview,
    } = this.state;
    const { email } = this.props.user;
    let displayPrice = "";
    if (chargesPreview) {
      displayPrice = this.getCopyPrice();
    }
    const planPrice =
      displayPrice != ""
        ? displayPrice.replace(/[ ,.]/g, "")
        : planToBePurchased && planToBePurchased.price.replace(/[ ,.]/g, "");
    if (false) {
      return null;
    }
    if (acceptedTerms) {
      if (giftcode !== "") {
        return (
          <div className="button" onClick={this.sendCodeHandler}>
            SUBMIT
          </div>
        );
      } else {
        const price = parseInt(planPrice);

        return (
          <StripeCheckout
            email={email}
            billingAddress={true}
            token={this.selectGotToken}
            amount={price}
            stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
          >
            <div className="button" >SUBMIT</div>
         </StripeCheckout>
        );
      }
    } else {
      return <div className="button disabled">SUBMIT</div>;
    }
  }

  planSelectionOnChange(product) {
    const { interval, product_id } = product;

    this.setState({
      annualPlan: interval,
      planToBePurchased: product,
      productId: product_id,
    });
  }

  giftcodeOnChange(value) {
    const giftcode = value;
    this.setState({ giftcode, annualPlan: "year" });
  }

  acceptedTermsOnChange() {
    this.setState({ acceptedTerms: !this.state.acceptedTerms });
  }

  getRadioButtonConfig(product) {
    const { interval, price } = product;
    const { annualPlan } = this.state;
    let preSaleTickets = true;
    let productPosition = "left";
    let productIntervalOption = "monthlyOption";
    let giftcodeDisplay = false;
    if (interval === "year") {
      // TODO REMOVE GIFTCODE FOR OTHER PLANS
      productPosition = "right";
      productIntervalOption = "annualOption";
      giftcodeDisplay = true;
    }
    let config = {
      interval,
      price,
      productPosition,
      productIntervalOption,
      giftcodeDisplay,
      preSaleTickets,
      product,
      annualPlan,
    };
    return config;
  }

  renderRadioButton(config, automaticallyChecked) {
    const {
      interval,
      price,
      productPosition,
      productIntervalOption,
      giftcodeDisplay,
      preSaleTickets,
      product,
      annualPlan,
    } = config;

    //This is necessary for set yearly option as default whenever montly option is available too.
    if (
      !automaticallyChecked &&
      interval == "year" &&
      !this.state.setAnualRadioButtonData
    ) {
      this.setState({
        annualPlan: interval,
        planToBePurchased: product,
        productId: product.product_id,
        setAnualRadioButtonData: true,
      });
    }

    return (
      <div
        className={`radio-${productPosition}`}
        key={`radio-${productPosition}`}
        onClick={() => this.planSelectionOnChange(product)}
      >
        <RadioButton
          id={productIntervalOption}
          checked={
            automaticallyChecked ? automaticallyChecked : annualPlan == interval
          }
          onChange={() => this.planSelectionOnChange(product)}
          product={product}
          value={interval}
        />
        <div className="radio-description">
          <div className="term">
            {interval == "month" ? "Monthly" : "Annual"}
          </div>
          <div className="price">
            ${price} per {interval}
            <br />
            {preSaleTickets && (
              <span>
                {" "}
                {interval == "month"
                  ? "(no pre-sale ticket access)"
                  : "(includes pre-sale ticket access)"}
              </span>
            )}
          </div>
          {giftcodeDisplay && (
            <Input
              className="input--giftcode input"
              placeholder="Enter Gift Code"
              limit={8}
              value={this.state.giftcode}
              onChange={this.giftcodeOnChange}
              name="code"
            />
          )}
        </div>
      </div>
    );
  }

  productSelection() {
    const productSelection = [];
    const { planSelected, planId } = this.state;
    const { name } = this.props.purchasedPlan;

    if (planSelected) {
      if (
        planId != "NYA-UNLIMITED" ||
        (planId == "NYA-UNLIMITED" && name != "NYA-FREE")
      ) {
        let anualRadioButton = this.renderSingleAnualRadioButton();
        productSelection.push(anualRadioButton);
      } else {
        planSelected.plan.forEach((product) => {
          let config = this.getRadioButtonConfig(product);
          productSelection.push(this.renderRadioButton(config, false));
        });
      }
    }
    return <div className="productSelection">{productSelection}</div>;
  }

  renderSingleAnualRadioButton() {
    const { planSelected } = this.state;
    let plan = planSelected.plan.find((plan) => plan.interval == "year");
    const { interval, product_id } = plan;
    let config = this.getRadioButtonConfig(plan);
    let anualRadioButton = this.renderRadioButton(config, true);

    if (!this.state.singleRadioButtonRendered) {
      this.setState({
        annualPlan: interval,
        planToBePurchased: plan,
        productId: product_id,
        singleRadioButtonRendered: true,
      });
    }
    return anualRadioButton;
  }

  finishedProrationRequest() {
    this.prorationRequestFinished = true;
    this.setState({ prorationAvailable: true });
  }

  checkFutureProration(planSelected) {
    //Supporting proration preview of an anual subscription
    let chargesPreview = [];
    let plan = planSelected.plan.find((plan) => plan.interval == "year");
    this.prorationRequestFinished = false;
    const { product_id: planId, interval } = plan;
    const { token } = this.props;
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };

    //todo : data fetch for this
    const request = {
      method: "POST",
      query: "api/subscriptions/customer-next-charge",
      body: JSON.stringify({ planId }),
      headers,
    };
    fetchData(request)
      .then((nextInvoice) => nextInvoice.json())
      .then((nextInvoice) => {
        chargesPreview.push({
          interval,
          futureCharge: nextInvoice.total,
          prorationDate: nextInvoice.subscription_proration_date,
        });
        this.setState({
          chargesPreview,
          prorationPreviewPlan: planSelected.planName,
        });
        this.finishedProrationRequest();
      })
      .catch((error) => {
        if (error) {
          chargesPreview.push({
            interval: "year",
            futureCharge: plan.price,
          });
          this.setState({
            chargesPreview,
            prorationPreviewPlan: planSelected.planName,
            prorationAvailable: true,
            defaultProration: true,
          });
          this.finishedProrationRequest();
          console.error(
            "There was an error obtaining the proration charge" + err
          );
        }
      });
  }

  checkIfUpgradeOrDowngrade(currentPlanName, newPlanName) {
    let action = "upgrade";
    if (
      (currentPlanName == "RUST" && newPlanName == "CLASSIC") ||
      (currentPlanName == "PATRON" &&
        (newPlanName == "CLASSIC" || newPlanName == "RUST"))
    ) {
      action = "downgrade";
    }
    return action;
  }

  getCopyPrice() {
    const { chargesPreview, defaultProration } = this.state;
    let price = chargesPreview[0].futureCharge;
    if (!defaultProration) {
      price = parseFloat(chargesPreview[0].futureCharge / 100).toFixed(2);
    }
    return price;
  }

  getDefaultDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear() + 1;
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var finalDate = `${month}/${day}/${year}`;
    return finalDate;
  }

  renderConfirmationCopy(action, currentPlanName, newPlanName) {
    const { chargesPreview, defaultProration } = this.state;
    const { renewalDate, interval } = this.props.purchasedPlan;
    let displayDate = interval == "month" ? this.getDefaultDate() : renewalDate;
    let displayPrice = 0.0;
    if (chargesPreview) displayPrice = this.getCopyPrice();

    if (action == "downgrade") {
      return (
        <div className="confirmation-description">
          <div className="confirmation-title"> What you need to know:</div>
          <div className="explanation">
            Your current{" "}
            <div className="plan-name">{currentPlanName.toLowerCase()}</div>{" "}
            subscription will remain active for the remainder of it's current
            term.
            <br />
            <br />
            At the end of this term, on{" "}
            <p className="renewal-date">{renewalDate}</p> your account will be
            downgraded to a{" "}
            <div className="plan-name">{newPlanName.toLowerCase()}</div>{" "}
            subscription and you will be charged{" "}
            <p className="proration-value">{`$${displayPrice}`}</p>
            <br />
            <br />
            You will continue to enjoy the benefits of your current subscription
            level until that time.
          </div>
        </div>
      );
    } else {
      return (
        <div className="confirmation-description">
          <div className="confirmation-title"> What you need to know:</div>
          <div className="explanation">
            Today you will be charged{" "}
            <p className="proration-value">{`$${displayPrice}`}</p>
            <br />
            (this is the cost of your new subscriptions less the amount
            remaining on your current subscription).
            <br />
            <br />
            Unless cancelled, your subscription will renew at the full price of
            your new subscription on{" "}
            <p className="renewal-date">{displayDate}</p>.
          </div>
        </div>
      );
    }
  }

  renderConfirmationButtons(action) {
    let buttonText = "UPGRADE SUBSCRIPTION";
    if (action == "downgrade") buttonText = "DOWNGRADE SUBSCRIPTION";
    return (
      <div className="confirmation-buttons">
        <div className="confirm-purchase" onClick={this.goToSelectionScreen}>
          {buttonText}
        </div>
        <div className="back-purchase" onClick={this.backToPlans}>
          BACK
        </div>
      </div>
    );
  }

  goToSelectionScreen() {
    this.setState({ upgrade: true });
    this.setState({ state: "select", screen: "plans", view: "select" });
  }

  renderConfirmationScreen() {
    const { planSelected, planId } = this.state;
    //get this from the user
    const user = this.getUserInformation();
    const { userPlanType } = user;

    const {
      planType,
      interval,
      price: currentPlanPrice,
    } = this.props.purchasedPlan;

    let currentPlanName = this.state.planNames[userPlanType] || "NYA-FREE";
    let newPlanName = this.state.planNames[planId];
    let action = this.checkIfUpgradeOrDowngrade(currentPlanName, newPlanName);

    return (
      <div className="content select confirmation">
        <div className="header-section">
          <div className="plan-box current">
            <div className="plan-status">Current Subscription</div>
            <div className="plan-name">
              {currentPlanName ? currentPlanName : "NYA-FREE"}
            </div>
            <div className="plan-price">
              {currentPlanPrice && interval
                ? `$${currentPlanPrice} /${interval}`
                : ""}
            </div>
          </div>
          {/* <img className="arrow" src={arrowImg}/> */}
          {/* <img className="arrow" src={arrowImg}/> */}
          <div className="plan-box new">
            <div className="plan-status">New Subscription</div>
            <div className="plan-name">{newPlanName}</div>
            <div className="plan-price">{`$${planSelected.yearPrice} /year`}</div>
          </div>
        </div>
        <div className="description-section">
          {this.renderConfirmationCopy(action, currentPlanName, newPlanName)}
          {this.renderConfirmationButtons(action)}
        </div>
      </div>
    );
  }

  confirmation() {
    const { planSelected, prorationPreviewPlan } = this.state;
    planSelected &&
      prorationPreviewPlan != planSelected.planName &&
      this.checkFutureProration(planSelected);

    if (!planSelected) {
      this.setState({ state: "initial" });
      return null;
    }

    if (this.state.prorationAvailable && this.prorationRequestFinished) {
      let confirmationScreen = this.renderConfirmationScreen();
      this.state.prorationAvailable = false; // FIXME
      this.state.prorationPreviewPlan = "";
      this.prorationRequestFinished = false;
      return confirmationScreen;
    }else{
      return (
        <div className="loading">
          <center>
            <LoadingIndicator/>
          </center>
        </div>
      );
    }
  }

  select() {
    const {
      acceptedTerms,
      giftcode,
      planSelected,
      planId,
      prorationPreviewPlan,
      tryOtherPlan,
      couponPlan,
      codeNotification,
    } = this.state;

    const { name } = this.props.purchasedPlan;

    let needSubscriptionPurchase = true;
    let planSelectedName = planSelected && planSelected.planName;
    const token = false;
    // freePassToken();
    const hasValidFreePass = token !== null && token.validity ? true : false;
    let newPlanName = this.state.planNames[planId];

    //TEMP DISABLE TO ALLOW UPGRADE -DOWNGRADE
    // if (hasAuth() && !hasValidFreePass) needSubscriptionPurchase = isFreeUser();
    if ((!needSubscriptionPurchase && !giftcode) || !planSelected) {
      this.setState({ state: "initial" });
      return null;
    }

    return (
      <div className="content select">
        {needSubscriptionPurchase ? (
          <React.Fragment>
            <div className="select-header">
              {planId != "NYA-UNLIMITED"
                ? `${newPlanName} Subscription`
                : name != "NYA-FREE"
                ? `${newPlanName} Subscription`
                : "Select Subscription"}
            </div>
            {this.productSelection()}
            {tryOtherPlan && (
              <div className="coupon-redeem" onClick={this.backToPlans}>
                {codeNotification}
              </div>
            )}
            <div className="terms">
              <CheckBox
                checked={acceptedTerms}
                onChange={this.acceptedTermsOnChange}
                name="terms"
              />
              <div className="terms-blurb">
                By clicking submit, you authorize us to charge you the price
                above and applicable tax for the duration that you have
                selected. After this period ends, your subscription will
                automatically be renewed and you will be charged the standard
                price for that subscription until you cancel. This does not
                apply to gift subscriptions which will expire 1 year to the date
                after redemption. You can see when you subscription will renew
                next, or learn how to cancel, via your account page. Your
                subscription is subject to our{" "}
                <a href="/terms.html" target="_blank">
                  Terms
                </a>{" "}
                and to our{" "}
                <a href="/privacy.html" target="_blank">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="buttons-bottom">{this._getPurchaseButton()}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="message subscribed">
              Sorry, but it looks like you're trying to claim a gift but you
              already have a subscription
            </div>
            <div className="buttons-bottom">
              <div className="button clear" onClick={this.clickExplore}>
                EXPLORE NYA
              </div>
              <div style={{ height: "65px" }} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  selectGotToken(token) {
    const {upgrade, productId:planId,chargesPreview} = this.state

    const {planType} = this.props.purchasedPlan 
    const {token:headerToken} = this.props
    const {id:source} = token
    const headers = {'Authorization': 'Bearer ' + headerToken,'Content-Type': 'application/json'}

    let displayPrice = 0
    this.setState({ state: "loading" })

    if(chargesPreview) displayPrice = this.getCopyPrice()
    let planBeforeUpgrade = this.state.planNames[planType] || "";
    const request = {
      method: "POST",
      query: "api/subscriptions",
      body: JSON.stringify({
        source,
        planId,
        upgrade,
        displayPrice,
        planBeforeUpgrade,
      }),
      headers,
    };

    fetchData(request).then(
      (res) => this.setState({ state: "paymentOK" }),
      (err) => this.setState({ state: "paymentFail" })
    );
  }

  paying() {
    return (
      <div className="content">
        <div className="message">Creating your subscription...</div>
      </div>
    );
  }

  paymentOK() {
  
    const { token,setUser, router} = this.props
    console.log("token", token)
    if(token){
    updateUserInfo(token, setUser);
    }

    router.push('/account/subscription')
        
    return (
      <div className="content">
        <div className="message">
          <LoadingIndicator/>
          Thank you for purchasing a NYA subscription. <br />
          Reload in {3000 / 1000} seconds...
        </div>
        <div className="buttons-bottom">
          <div className="button" onClick={this.clickExplore}>
            EXPLORE NYA
          </div>
        </div>
      </div>
    );
  }

  paymentFail() {
    return (
      <div className="content">
        <div className="message">
          Sorry. Your payment information didn't go through.
        </div>
        <div className="buttons-bottom">
          <div className="button clear" onClick={this.clickExplore}>
            EXPLORE NYA
          </div>
          <div style={{ height: "65px" }} />
          <div className="button" onClick={this.backToPlans}>
            BACK TO PLANS
          </div>
        </div>
      </div>
    );
  }

  clickExplore() {
    document.location.href = "/";
  }

  backToPlans(){
    this.props.router.push('/account/plans')
  }

  render() {
    return <div className="panel plans-panel">{this.getContent()}</div>;
  }
}

const PlansWithRouter = (props) => {
  const router = useRouter()
  return <PlansPanel {...props} router={router} />
}

export default  withAuth0(PlansWithRouter)
