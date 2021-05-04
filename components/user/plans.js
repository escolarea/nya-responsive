import React, { Component } from "react";
import _, { fromPairs } from "lodash";
import StripeCheckout from 'react-stripe-checkout';
import fetchData from '../../api/fetch'
// import {connect} from 'react-redux';
import { login } from '../../static/auth0';
import { withAuth0 } from '@auth0/auth0-react';

// import spinnerFrame01 from "../../static/images/loading-indicator/frame_01.png";
import Input from "../input";
// import Login from "../services/login";
// import { registerButtonClick } from "../services/tracking";
// import { fetchExclusiveEntries } from "../services/fetch";
// import SplashScreen from "../splash-screen";
// import checkImg from "../../public/static/images/account-info/check-item.png";
import {NYA_FREE, NYA_UNLIMITED} from '../../utils/url_constants'
import {sortPlansAccordingPrice,  getPlanInfo,getAllPlanBenefits,getBenefitsPerPlan} from '../../helpers/plans'
// import arrowImg from "../../images/account-info/arrow-image.png";

// import {
//   getUserInfo,
//   createOrUpdatePlan,
//   hasAuth,
//   redeemCode,
//   isPaying,
//   setIsPaying,
//   paymentProcessReloadDelay,
//   freePassToken,
//   checkCustomerNextProrationInvoice,
//   getGiftCode
// } from "../services/api";

// TODO: Ensure `paymentFail` returns reletive error msg

class Line extends Component {
  render() {
    return (
      <div className="description-line">
        <div className="line">
          <div className="line-text"> {this.props.children}</div>
          <div className="plan-checks">{this.props.planChecks}</div>
        </div>
      </div>
    );
  }
}

class RadioButton extends Component {
  render() {
    const {
      id,
      checked,
      value,
      onChange,
      disabled,
      product,
    } = this.props;
    return (
      <div className="custom-radio">
        <input
          type="radio"
          id={id}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          value={value}
          name={value}
        />
        <div className="toggle" />
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

const PlanBtn = (props)=>{
  const {
    isFreePlan,
    userHasThisPlan,
    plan,
    planId,
    checkIfShouldHideButton,
    initialClickPurchase,
    topButton = true,
    userPlanType,
    userAuthenticated
  } = props; 




  let buttonText = plan && plan.buyButtonText
    buttonText = typeof buttonText === "string"  ? buttonText : planId
    return (
      <div className={`button-bottom ${topButton ? "plan-button" : "plan-button-bottom"}`}>
      {!isFreePlan && (
        <div
          className={`button get-plan ${
            !(userHasThisPlan && userAuthenticated) ?   checkIfShouldHideButton(planId, userAuthenticated, userPlanType, ) : "subscribed" 
          }`}
         
          onClick={() =>{
            if(!userAuthenticated){
              login();
              return;
            }
            if(userHasThisPlan){
              window.history.replaceState({}, "", '/account/overview');
              window.location.reload();
              return;
            }

            initialClickPurchase(plan, planId)
          } }
        >
          {userHasThisPlan && userAuthenticated
            ? "MANAGE"
            : buttonText }
        </div>
      )}
    </div>
    );
}
class PlansPanel extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    //previous const state = props.view === "select" ? "select" : "initial";
    //change this to the state and move the logic to the componentDidMount
    // const state = props.view === "select" ? "select" : (props.view === "confirmation" ? "confirmation" : "initial");

    // const queryCode = props.router.location.query.code;
    this.prorationRequestFinished = false
    this.state = {
      state:'initial',
      annualPlan: "year",
      acceptedTerms: false,
    //   giftcode: queryCode || "",
      giftcode:  "",
      tryOtherPlan:false,
      planNames : {
        "NYA-UNLIMITED": "CLASSIC",
        "NYA-RUST": "RUST",
        "NYA-PATRON" : "PATRON"
      }
    };
    

    this.initialClickPurchase = this.initialClickPurchase.bind(this);
    this.planSelectionOnChange = this.planSelectionOnChange.bind(this);
    this.acceptedTermsOnChange = this.acceptedTermsOnChange.bind(this);
    this.selectGotToken = this.selectGotToken.bind(this);
    this.clickExplore = this.clickExplore.bind(this);
    this.backToPlans = this.backToPlans.bind(this);
    this.giftcodeOnChange = this.giftcodeOnChange.bind(this);
    this.sendCodeHandler = this.sendCodeHandler.bind(this);
    this.triggerAuth0 = this.triggerAuth0.bind(this);
    this.triggerConversionEvent = this.triggerConversionEvent.bind(this);
    this.goToSelectionScreen = this.goToSelectionScreen.bind(this);
    this.createPurchase  = this.createPurchase.bind(this)
    this.checkIfShouldHideButton = this.checkIfShouldHideButton.bind(this)
  }
  
  componentDidMount() {

    let { plansAvailable } = this.props;
    let planSelected = plansAvailable && plansAvailable[NYA_UNLIMITED];
    if (planSelected) this.setState({ planSelected, planId: NYA_UNLIMITED, singleRadioButtonRendered: false, setAnualRadioButtonData: false });
  }
  componentWillUpdate(newprops /*, newstate*/) {
    // if (newprops.view !== this.props.view) {
    //   let state;
    //   let singleRadioButtonRendered = false
    //   let setAnualRadioButtonData = false
    //   if (newprops.view === "select") state = "select";
    //   if (newprops.view === "confirmation") state = "confirmation";
    //   if (newprops.view === undefined) state = "initial";

    //   if (state) this.setState({ state,
    //                             singleRadioButtonRendered, 
    //                             setAnualRadioButtonData, 
    //                             tryOtherPlan:false, 
    //                             acceptedTerms:false });

    // }

    // if (newprops.view === "select") this.triggerAuth0();
  }
  componentWillUnmount() {
    clearTimeout(this.emit);
  }
  triggerConversionEvent() {
    const { planSelected } = this.state;
    const currency = "USD";
    const value = parseFloat(planSelected.price);

    // registerButtonClick({ value, currency });
  }
  fetch() {
    fetchExclusiveEntries().catch(() => {
      document.location.href = "/";
      document.location.reload();
    });
  }

  triggerAuth0() {
    if (!hasAuth()) {
      clearTimeout(this.emit);
      this.emit = setTimeout(Login, 100);
    }
  }
  getContent() {
    return this[this.state.state]();
  }

  renderPlanBenefits(planBenefitsObj) {
    
    return (
      <div className="details section">
        {planBenefitsObj &&
          planBenefitsObj.map((benefit, idx) => {
            return (
              <div key={idx}>
                <Line key={idx} >
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
  planType(planId){
    const plan={
      "NYA-UNLIMITED" :"free",
      "NYA-RUST" : "rust",
      "NYA-PATRON" : "patron"
    }
    return plan[planId] 
  }

  renderPlans(plans, planInformation) {
    const {
      user_metadata: {
        subscription: {
          plan: userPlanId = NYA_FREE,
          type= 'stripe'
        } = {},
      } = {},
    } = this.props.user  || {};
  
    const isAuthenticated = this.props.user ? true : false;

    const isAppleSub = type == 'stripe'? false: true ;
    const planItems = [];
    let plansData = [];
    let planIDs = [];
    let userPlanType =  userPlanId.split(/\W|_/g) 
    userPlanType = `NYA-${userPlanType[userPlanType.length - 1]}`;

    let sortedPlans = sortPlansAccordingPrice(plans);
    Object.keys(sortedPlans).forEach((planId) => {
      let userHasThisPlan = userPlanType.includes(planId);
      let plan = plans[planId];
      let isFreePlan = (planId == NYA_FREE);

      let planStyle = this.planType(planId)
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
          {this.renderPlanBenefits(plan.planBenefits)}
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

  checkIfShouldHideButton(planID, userAuthenticated, planType){
    let currentPlanName = this.state.planNames[planType] || "NYA-FREE";
    let buttonPlanName = this.state.planNames[planID];
    let className = "";
    if (userAuthenticated){
      if ((currentPlanName == "RUST" && (buttonPlanName == "CLASSIC"))
      ||(currentPlanName == "PATRON" && (buttonPlanName == "CLASSIC" || buttonPlanName == "RUST"))){
        className = "hidden";
      }
    }
    return className
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
        <div className="content initial">
            loading
          {/* <SplashScreen loadState={100} /> */}
        </div>
      );
    } else {
      return <div>{this.renderPlans(plansAvailable, planInformation)}</div>;
    }
  }

  initialClickPurchase(plan, planId) {
    let planToBePurchased = plan && plan.plan[0];
    const {planType, name} = this.props.purchasedPlan
    this.setState({
        state:'select',screen: "plans", view: "select"
      })

    this.setState({
      planSelected: plan,
      planId,
      planToBePurchased,
      annualPlan:planToBePurchased.interval, 
      productId: planToBePurchased.product_id,
    });

    return; 
    // Verify that the plan is different than tha one purchased to enable upgrade/downgrade
    if (planType !== planId) {
      // show other view other than vie
    //   if (hasAuth()) {
    if (true) {
        if(planId != "NYA-UNLIMITED"){
          if (name == "NYA-FREE"){
              this.setState({
                state:'select',screen: "plans", view: "select"
              })
           
          }else{
            this.setState({
                state:'confirmation',screen: "plans", view: "select"
              })
          } 
        }else{
          if (name != "NYA-FREE"){
            this.setState({
                state:'confirmation',screen: "plans", view: "select"
              })
           
          }else {
            this.setState({
                state:'confirmation',screen: "plans", view: "select"
              })
          }
        }
      } else {
        // Login("/account?screen=plans&view=select");
      }
    } else {
        //TODO: redirect to subscription overview
    }
  }

  sendCodeHandler() {
    const {giftcode,planToBePurchased} = this.state
    const {token} = this.props;
    const header = {'Authorization': 'Bearer ' + token}

    // validate that it's 8 digit 
    // this.props.token
    // /api/subscriptions/gift/${code}
    if(token){
      fetchData('POST','api/subscriptions/plan-prices', giftcode , header).then((planId, error)=>{
        if(planId === planToBePurchased.product_id){
          this.setState({ state: "paying" }, () => {
            fetchData(`/api/subscriptions/gift/${giftcode}`,'',header).then(
            (res) => this.setState({ state: "paymentOK" }),
            (err) => {
              this.setState({ state: "paymentFail",codeNotification:'Gift redemption failed, please contact us' })
            }
            );
          });
        }else{
            this.setState({tryOtherPlan:true, couponPlan:planId, codeNotification:`Redeem your coupon on plan ${planId}`})
        }    
      }).catch(err=>{
        this.setState({tryOtherPlan:true, codeNotification:'Gift code not found, please contact us'})
      })
    }   
  }
  async createPurchase(token){
   //TODO: create request to create user and redirect to other views.
   //add load view when waiting for this.
  }

  _getPurchaseButton() {
    const {
      acceptedTerms,
      annualPlan,
      giftcode,
      planToBePurchased,
      planId,
      chargesPreview
    } = this.state;
    const {email} = this.props.user

    let displayPrice = ""
    if(chargesPreview){
     displayPrice = this.getCopyPrice()
    } 
    const planPrice = displayPrice != "" ? displayPrice.replace(/[ ,.]/g, "") : 
      planToBePurchased && planToBePurchased.price.replace(/[ ,.]/g, "");
    // isPaying()
    if (false) {
      return null;
    }
    if (acceptedTerms) {
      if (giftcode !== "" ) {
        return (
          <div className="button" onClick={this.sendCodeHandler}>
            SUBMIT
          </div>
        );
      } else {
        const price = parseInt(planPrice);
        // const userInfo = getUserInfo();
        // const email =
        //   (userInfo.user_metadata && userInfo.user_metadata.customEmail) ||
        //   userInfo.email;

        return (
          <StripeCheckout
          email={email}
          billingAddress={true}
          token={this.selectGotToken}
          amount={price}
          stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
          >
            <div className="button">SUBMIT</div>
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

  getRadioButtonConfig(product){
    const { interval, price } = product;
    const { annualPlan} = this.state;
    let preSaleTickets = true
    let productPosition = "left";
    let productIntervalOption = "monthlyOption";
    let giftcodeDisplay = false;
    if (interval === "year") {
      // TODO REMOVE GIFTCODE FOR OTHER PLANS
      productPosition = "right";
      productIntervalOption = "annualOption";
      giftcodeDisplay = true;
    }
    let config = {interval, price, productPosition, productIntervalOption, 
                  giftcodeDisplay, preSaleTickets, product, annualPlan }
    return config
  }

  renderRadioButton(config, automaticallyChecked){
    const {interval, price, productPosition, productIntervalOption, 
           giftcodeDisplay, preSaleTickets, product, annualPlan } = config

    //This is necessary for set yearly option as default whenever montly option is available too.
    if (!automaticallyChecked && interval == "year" && !this.state.setAnualRadioButtonData ) {
      this.setState({
        annualPlan: interval,
        planToBePurchased: product,
        productId: product.product_id,
        setAnualRadioButtonData: true
      });
    }

    return(
      <div className={`radio-${productPosition}`} key={`radio-${productPosition}`} onClick={()=>this.planSelectionOnChange(product)} >
              <RadioButton
                id={productIntervalOption}
                checked={automaticallyChecked ? automaticallyChecked : annualPlan == interval} 
                onChange={()=>this.planSelectionOnChange(product)}
                product={product}
                value={interval}
              />
              <div className="radio-description">
                <div className="term">{interval == 'month' ? "Monthly" : "Annual"}</div>
                <div className="price">
                  ${price} per {interval}
                  <br />
                  {preSaleTickets && <span> {interval == 'month' ? "(no pre-sale ticket access)" : "(includes pre-sale ticket access)"}</span>}
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
    const productSelection= []
    const {planSelected,planId} = this.state;
    const {name} = this.props.purchasedPlan

    if(planSelected){
      if (planId != "NYA-UNLIMITED" || (planId == "NYA-UNLIMITED" && name != "NYA-FREE")){
        let anualRadioButton = this.renderSingleAnualRadioButton()
        productSelection.push(anualRadioButton);
      } else { 
        planSelected.plan.forEach((product) => {
          let config = this.getRadioButtonConfig(product);
          productSelection.push(this.renderRadioButton(config, false));
        });
      }
    }
    return <div className="productSelection">{productSelection}</div> 
  }

  renderSingleAnualRadioButton(){
    const { planSelected} = this.state;
    let plan = planSelected.plan.find(plan => plan.interval == "year")
    const { interval, product_id } = plan;
    let config = this.getRadioButtonConfig(plan)
    let anualRadioButton =this.renderRadioButton(config, true)
   
    if (!this.state.singleRadioButtonRendered){
      this.setState({
        annualPlan: interval,
        planToBePurchased: plan,
        productId: product_id,
        singleRadioButtonRendered: true
      });
    }
    return anualRadioButton 
  }

  finishedProrationRequest(){
    this.prorationRequestFinished = true
    this.setState({prorationAvailable:true})
  }

//   checkFutureProration(planSelected){
//     //Supporting proration preview of an anual subscription
//     let chargesPreview = []
//     let plan = planSelected.plan.find(plan => plan.interval == "year")
//     this.prorationRequestFinished = false
//     const { product_id, interval } = plan;
//     checkCustomerNextProrationInvoice(product_id).then(nextInvoice=>{
//       chargesPreview.push({
//         interval,
//         futureCharge: nextInvoice.total,
//         prorationDate: nextInvoice.subscription_proration_date
//       }); 
//       this.setState({chargesPreview, prorationPreviewPlan: planSelected.planName})
//       this.finishedProrationRequest()
//     }).catch(err => {
//       chargesPreview.push({
//         interval: "year",
//         futureCharge: plan.price
//       }); 
//       this.setState({chargesPreview, prorationPreviewPlan: planSelected.planName, prorationAvailable:true, defaultProration: true})
//       this.finishedProrationRequest()
//       console.error("There was an error obtaining the proration charge" + err)
//     })
//   }

  checkIfUpgradeOrDowngrade(currentPlanName,newPlanName){
    let action = "upgrade";
    if (currentPlanName == "RUST" && (newPlanName == "CLASSIC")
        ||currentPlanName == "PATRON" && (newPlanName == "CLASSIC" || newPlanName == "RUST")){
        action = "downgrade";
    }
    return action
  }

  getCopyPrice(){
    const {chargesPreview, defaultProration} = this.state;
    let price = chargesPreview[0].futureCharge
    if(!defaultProration) {
      price =parseFloat((chargesPreview[0].futureCharge)/100).toFixed(2)
    } 
    return price
  }

  getDefaultDate(){	
    var currentDate = new Date();	
    var year = currentDate.getFullYear() + 1;	
    var month = currentDate.getMonth() + 1;	
    var day = currentDate.getDate();	
    var finalDate = `${month}/${day}/${year}`	
    return finalDate	
  }

  renderConfirmationCopy(action, currentPlanName, newPlanName){
    const {chargesPreview, defaultProration} = this.state;
    const {renewalDate, interval} = this.props.purchasedPlan
    let displayDate = interval == "month" ? this.getDefaultDate() : renewalDate
    let displayPrice = 0.00
    if(chargesPreview) displayPrice = this.getCopyPrice()

    if (action == "downgrade"){
      return (
        <div className="confirmation-description">
          <div className="confirmation-title"> What you need to know:</div>
          <div className="explanation">
            Your current <div className="plan-name">{currentPlanName.toLowerCase()}</div> subscription will remain active for the remainder of it's current term.<br/><br/>
            At the end of this term, on <p className="renewal-date">{renewalDate}</p> your account will be downgraded to a <div className="plan-name">{newPlanName.toLowerCase()}</div> subscription and 
            you will be charged <p className="proration-value">{`$${displayPrice}`}</p><br/><br/>
            You will continue to enjoy the benefits of your current subscription level until that time.
          </div> 
        </div>
      );
    } else{
      return (
        <div className="confirmation-description">
          <div className="confirmation-title"> What you need to know:</div>
          <div className="explanation">
            Today you will be charged <p className="proration-value">{`$${displayPrice}`}</p><br/>
            (this is the cost of your new subscriptions less the amount remaining on your current subscription).<br/><br/>
            Unless cancelled, your subscription 
            will renew at the full price of your new subscription on <p className="renewal-date">{displayDate}</p>.
          </div> 
        </div>
      );
    }
  }

  renderConfirmationButtons(action){
    let buttonText = "UPGRADE SUBSCRIPTION"
    if (action == "downgrade") buttonText = "DOWNGRADE SUBSCRIPTION"
    return(
      <div className="confirmation-buttons">
        <div className="confirm-purchase" onClick={this.goToSelectionScreen}>{buttonText}</div>
        <div className="back-purchase" onClick={this.backToPlans}>BACK</div>
      </div>
    );
  }

  goToSelectionScreen(){
    this.setState({upgrade:true})
    this.props.router.replace({
      pathname: "/account",
      query: { screen: "plans", view: "select" },
    });
  }

  renderConfirmationScreen(){
    const {planSelected, planId} = this.state;
    const {planType,interval, price: currentPlanPrice} = this.props.purchasedPlan 
     
    let currentPlanName = this.state.planNames[planType] || "NYA-FREE";
    let newPlanName = this.state.planNames[planId];
    let action = this.checkIfUpgradeOrDowngrade(currentPlanName, newPlanName)
   
    return (  
      <div className="content select confirmation">
        <div className="header-section">
          <div className="plan-box current">
            <div className="plan-status">Current Subscription</div>
            <div className="plan-name">{currentPlanName ? currentPlanName: "NYA-FREE"}</div>
            <div className="plan-price">{ currentPlanPrice && interval ? `$${currentPlanPrice} /${interval}`: ""}</div> 
          </div>
          <img className="arrow" src={arrowImg}/>
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

//   confirmation(){
//       console.log("confirmation")
//     const {planSelected, prorationPreviewPlan} = this.state;
//     planSelected && prorationPreviewPlan != planSelected.planName && this.checkFutureProration(planSelected)

//     if (!planSelected ) {
//       this.setState({ state: "initial" });
//       return null
//     }

//     if (this.state.prorationAvailable &&  this.prorationRequestFinished){
//       let confirmationScreen = this.renderConfirmationScreen();
//       this.state.prorationAvailable = false // FIXME
//       this.state.prorationPreviewPlan = ""
//       this.prorationRequestFinished = false
//       return confirmationScreen;
//     }else{
//       return (
//         <div className="content select confirmation">
//           <SplashScreen loadState={100} />
//         </div>
//       );
//     }
//   }

  select() {
    const {
      acceptedTerms,
      giftcode,
      planSelected,
      planId,
      prorationPreviewPlan,
      tryOtherPlan, 
      couponPlan,
      codeNotification
    } = this.state;

    const {name} = this.props.purchasedPlan

    let needSubscriptionPurchase = true;
    let planSelectedName = planSelected && planSelected.planName 
    const token = false;
    // freePassToken();
    const hasValidFreePass = token !== null && token.validity ? true : false;
    let newPlanName = this.state.planNames[planId];

    //TEMP DISABLE TO ALLOW UPGRADE -DOWNGRADE
    // if (hasAuth() && !hasValidFreePass) needSubscriptionPurchase = isFreeUser();
    if (!needSubscriptionPurchase && !giftcode || !planSelected ) {
      this.setState({ state: "initial" });
      return null
    }
  
    return (
      <div className="content select">
        {needSubscriptionPurchase ? (
          <React.Fragment>
            <div className="select-header">
              {planId != "NYA-UNLIMITED" ? `${newPlanName} Subscription` : (name != "NYA-FREE" ?  `${newPlanName} Subscription` : "Select Subscription")}
            </div>
            {this.productSelection()}
            {tryOtherPlan&& <div className ="coupon-redeem" onClick={this.backToPlans}>{codeNotification}</div>}
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
                apply to gift subscriptions which will expire 1 year to the
                date after redemption. You can see when you subscription will
                renew next, or learn how to cancel, via your account page.
                Your subscription is subject to our{" "}
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
    const {upgrade, productId,chargesPreview} = this.state
    const {planType} = this.props.purchasedPlan 
    const header = {'Authorization': 'Bearer ' + token}
    let displayPrice = 0
    if(chargesPreview) displayPrice = this.getCopyPrice()
    let planBeforeUpgrade = this.state.planNames[planType] || "";

    fetchData('POST','api/subscriptions/plan-prices', {token, productId, upgrade, displayPrice, planBeforeUpgrade}, header).then(
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

    window.history.replaceState({}, "", '/account?screen=overview');
    window.location.reload();
    
    return (
      <div className="content">
        <div className="message">
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
    window.history.replaceState({}, "", '/account/plans');
    window.location.reload();
  }

  render() {
    return (
      <div className="panel plans-panel">
        {this.getContent()}
      </div>
    );
  }
}


export default  withAuth0(PlansPanel)