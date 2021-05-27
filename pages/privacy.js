import React, { useEffect, useState } from "react";
import LoadingIndicator from "../components/loading";

const Terms = ({}) => {
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    setPageStatus("ready");
  }, []);

  if (pageStatus === "loading") {
    return (
      <div className="loading">
        <center>
          <LoadingIndicator />
        </center>
      </div>
    );
  }
  return (
    <div id="account-menu-container" className="terms">
      <p className="title">
        <strong>NYA PRIVACY POLICY</strong>
      </p>
      <p>
        <strong>LAST UPDATED November 26, 2018</strong>
      </p>
      <ol>
        <li>
          <strong>Introduction</strong>
        </li>
      </ol>
      <p>Thanks for choosing NYA!</p>
      <p>
        We at Shakey Pictures, Inc. (&ldquo;<strong>NYA</strong>&rdquo;, &ldquo;
        <strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;) want to
        give you the best possible experience to ensure that you enjoy our
        service today, tomorrow, and in the future. To do this we need to
        understand your listening habits so we can deliver an exceptional and
        personalized service specifically for you. That said, your privacy and
        the security of your personal data is, and will always be, enormously
        important to us. So, we want to transparently explain how and why we
        gather, store, share and use your personal data - as well as outline the
        controls and choices you have around when and how you choose to share
        your personal data.
      </p>
      <p>
        That is our objective, and this Privacy Policy (&ldquo;
        <strong>Policy</strong>&rdquo;) will explain exactly what we mean in
        further detail below.
      </p>
      <ol start="2">
        <li>
          <strong>About this Policy</strong>
        </li>
      </ol>
      <p>
        This Policy sets out the essential details relating to your personal
        data relationship with NYA. The Policy applies to all NYA services,
        including this website and web properties (e.g., widgets and
        applications) (the &ldquo;<strong>Site</strong>&rdquo;) and mobile
        applications (&ldquo;<strong>Mobile Apps</strong>&rdquo;) (collectively
        the &ldquo;<strong>NYA Service</strong>&rdquo;). The terms governing
        your use of the NYA Service are defined in our Terms of Use (the &ldquo;
        <strong>Terms of Use</strong>&rdquo;).
      </p>
      <p>
        From time to time, we may develop new or offer additional services. If
        the introduction of these new or additional services results in any
        material change to the way we collect or process your personal data we
        will provide you with more information and additional terms or policies.
        Unless stated otherwise when we introduce these new or additional
        services, they will be subject to this Policy.
      </p>
      <p>The aim of this Policy is to:</p>
      <ul>
        <li>
          Ensure that you understand what personal data we collect about you,
          the reasons why we collect and use it, and who we share it with;
        </li>
        <li>
          Explain the way we use the personal data that you share with us in
          order to give you a great experience when you are using the NYA
          Service; and
        </li>
        <li>
          Explain your rights and choices in relation to the personal data we
          collect and process about you and how we will protect your privacy.
        </li>
      </ul>
      <p>
        We hope this helps you to understand our privacy commitments to you. For
        information on how to contact us if you ever have any questions or
        concerns, please see Section 14 below. Alternatively, if you do not
        agree with the content of this Policy, then please remember it is your
        choice whether you want to use the NYA Service.
      </p>
      <ol start="3">
        <li>
          <strong>
            Your rights and your preferences: Giving you choice and control
          </strong>
        </li>
      </ol>
      <p>
        We have implemented certain transparency and access controls in our
        Privacy Settings to help users understand and take advantage of rights
        granted to you regarding use of your personal data . As available and
        except as limited under applicable law, the rights afforded to
        individuals are:
      </p>
      <p>
        Right of Access - the right to request access to the personal data we
        process about you;
      </p>
      <p>
        Right to Rectification - the right to request that we amend or update
        your personal data where it is inaccurate or incomplete;
      </p>
      <p>
        Right to Erasure - the right to request that we delete your personal
        data, unless an exception applies. For example, we may need to keep your
        personal data to comply with our legal obligations;
      </p>
      <p>
        Right to Restrict - the right to request that we temporarily or
        permanently stop processing all or some of your personal data in certain
        circumstances. For example, if you contest the accuracy of your personal
        data, you may request that we restrict the processing of your personal
        data for the time it takes us to verify the accuracy of the data;
      </p>
      <p>
        Right to Object &ndash; the right to object to us processing your
        personal data in certain circumstances. For example, you may object to
        direct marketing including the use of your personal data for direct
        marketing profiling.
      </p>
      <p>
        Right to Data Portability - the right to request a copy of your personal
        data in electronic format and the right to transmit that personal data
        for use in another party&rsquo;s service.
      </p>
      <p>
        In order to enable you to exercise these rights with ease and to record
        your preferences in relation to how NYA uses your personal data, we
        provide you with access to the following settings via your Account
        Settings page.
      </p>
      <p>
        Notification Settings - allows you to choose which marketing
        communications you receive from NYA, If we send you electronic marketing
        messages based on your consent or as otherwise permitted by applicable
        law, you may, at any time, respectively withdraw such consent or declare
        your objection (&ldquo;opt-out&rdquo;) at no cost. The electronic
        marketing messages you receive from NYA (e.g. those sent via email) also
        will include an opt-out mechanism within the message itself (e.g. an
        unsubscribe link in the emails we send to you). You may also email us
        directly at mydata@mail.neilyoungarchives.com should you wish to
        restrict processing of your data, deleting your personal data, accessing
        your data or requesting a copy of your data to exercise the above
        rights.
      </p>
      <ol start="4">
        <li>
          <strong>How do we collect your personal data?</strong>
        </li>
      </ol>
      <p>We collect your personal data in the following ways:</p>
      <p>
        When you sign up for the NYA Service - when you sign up to the NYA
        Service, we collect certain personal data so you can use the NYA Service
        such as your email address, birth date, gender, and country.
      </p>
      <p>
        Through your use of the NYA Service - when you use the NYA Service, we
        collect data about your use of the NYA Service, such as what songs you
        have played and what playlists you have created.
      </p>
      <p>
        Personal data collected that enables us to provide you with additional
        features/functionality - from time to time, you also may provide us with
        additional personal data or give us your permission to collect
        additional personal data, e.g., to provide you with more features or
        functionality. You always will have the option to change your mind and
        withdraw your consent at any time.
      </p>
      <p>
        From third parties - we will receive personal data about you and your
        activity from third parties, including partners we work with in order to
        provide you with the NYA Service (please see Section 7 below). We will
        use this personal data either where you have provided your consent to
        the third party or to NYA to that data sharing taking place or where NYA
        has a legitimate interest to use the personal data in order to provide
        you with the NYA Service, or for the performance of a contract.
      </p>
      <p>
        We use anonymized and aggregated information for purposes that include
        testing our IT systems, research, data analysis, creating marketing and
        promotion models, improving the NYA Service, and developing new features
        and functionality within the NYA Service.
      </p>
      <ol start="5">
        <li>
          <strong>What personal data do we collect from you?</strong>
        </li>
      </ol>
      <p>
        We have set out in the tables below the categories of personal data we
        collect and use about you:
      </p>
      <p>
        <em>Personal data collected when you sign up for the NYA Service</em>
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>Categories of personal data</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>Description of category</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Account Registration Data</p>
            </td>
            <td>
              <p>
                This is the personal data that is provided by you or collected
                by us to enable you to sign up for and use the NYA Service. This
                information may include your email address, telephone number,
                postal code, and country.&nbsp;
                <br />
                <br />
                Some of the personal data we will ask you to provide is required
                in order to create your account. You also have the option to
                provide us with some additional personal data in order to make
                your account more personalized.&nbsp;
                <br />
                <br />
                The exact personal data we will collect depends on the type of
                NYA Service plan you sign up for and whether or not you use a
                Third Party Service (as defined in the Terms of Use, such as
                Facebook) to sign up and use the NYA Service. If you use a Third
                Party Service to create an account, we will receive personal
                data via that Third Party Service but only when you have
                consented to that Third Party Service sharing your personal data
                with us.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <br />
        <br />
      </p>
      <p>
        <em>Personal data collected through your use of the NYA Service</em>
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>Categories of personal data</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>Description of category</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>NYA Service Usage Data</p>
            </td>
            <td>
              <p>
                This is the personal or usage data that is collected about you
                when you are using the NYA Service - this may include:&nbsp;
                <br />
                <br />
              </p>
              <ul>
                <li>Information about your type of NYA Service plan.</li>
                <li>
                  Information about your interactions with the NYA Service which
                  includes the date and time of any requests you make, songs you
                  have listened to, playlists you create, and your interactions
                  with other NYA users. This also may include details of your
                  use of Third Party Applications.
                </li>
                <li>
                  Submissions (as defined in the Terms of Use) you post to NYA
                  including messages you send and/or receive via NYA and your
                  interactions with the NYA Customer Service team.
                </li>
                <li>
                  Technical data which may include URL information, cookie data,
                  your IP address, the types of devices you are using to access
                  or connect to the NYA Service, unique device IDs, device
                  attributes, network connection type (e.g. WiFi, 3G, LTE,
                  Bluetooth) and provider, network and device performance,
                  browser type, language, information enabling digital rights
                  management, operating system, and NYA application version.
                </li>
                <li>
                  If you do not want information collected through the use of
                  cookies, there is a simple procedure on most devices through
                  which the NYA Services are accessed that allows you to decline
                  the use of cookies. To learn more about cookies, please visit
                  http://www.allaboutcookies.org/. If you choose to decline
                  cookies, then some or all of the features, functionality and
                  promotions available through the NYA Service may not be
                  available to you.
                </li>
              </ul>
              <ul>
                <li>
                  The use of cookies allows our vendors and third-parties and
                  their vendors to deliver advertisements about our products and
                  services, and the products and services of others, when you
                  use the NYA Properties or other applications or visit websites
                  or web properties across the Internet on any of your devices.
                  These parties may place so-called &ldquo;pixel tags,&rdquo;
                  &ldquo;web beacons,&rdquo; &ldquo;clear GIFs&rdquo; or similar
                  technologies on the device through which you access the NYA
                  Properties, and other applications or websites across the
                  Internet, and also place or recognize third-party cookies when
                  you use the NYA Properties, or other applications, websites or
                  web properties. They may also use these technologies, along
                  with information they collect about your online use, to
                  recognize you across the devices you use, such as a mobile
                  device and a laptop. These vendors may use information about
                  your visits, on the different devices you use, to the NYA
                  Properties, and other applications, websites or web properties
                  (excluding your name, address, and telephone number), as well
                  as information received from third parties, to provide
                  advertisements for us and others about goods and services that
                  may be of interest to you. If you would like more information
                  about this practice, please visit the Network Advertising
                  Initiative at www.networkadvertising.org or the Digital
                  Advertising Alliance at www.aboutads.info. You may also visit
                  those sites to opt out of these advertising practices in
                  desktop and mobile browsers on the particular device on which
                  you are accessing this Privacy Policy. The NYA Service does
                  not respond to browser-based do-not-track signals.
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <br />
        <br />
      </p>
      <p>
        <em>
          Personal data collected with your permission that enables us to
          provide you with additional features/functionality
        </em>
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>Categories of personal data</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>Description of category</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Voluntary Mobile Data</p>
            </td>
            <td>
              <p>
                We may in the future offer new features where we could ask your
                consent (at your option) to collect additional personal data
                from your mobile device to provide you with
                features/functionality that will enhance your NYA Service
                experience.&nbsp;
                <br />
                <br />
                We will not access any of the personal data listed below without
                first obtaining your consent:
              </p>
              <ul>
                <li>
                  Your photos - If you give us permission to access your photos
                  or camera, we will only access images that you specifically
                  choose to share with us and metadata related to those images,
                  such as the type of file and the size of the image. We will
                  never scan or import your photo library or camera roll;
                </li>
                <li>
                  Your precise mobile device location - If you give us
                  permission to access your precise location, this enables us to
                  access your GPS or Bluetooth to provide location-aware
                  functionality in the NYA Service. Please note that this does
                  not include your IP address. We use your IP address to
                  determine non-precise location, for example, what country you
                  are in to comply with our licensing agreements; and,
                </li>
                <li>
                  Your contacts - If you give us permission to access your
                  contacts, this enables us to access individual contacts stored
                  on your device to help you find friends who use NYA.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p>Payment Data</p>
            </td>
            <td>
              <p>
                We do not collect your payment data associated with the purchase
                any of our Products or subscribe to any Streaming Service or
                other Services (all as defined in the Terms of Use) through the
                NYA Service; instead, our payment processor Stripe collects
                payment data. You can learn about the exact personal data
                collected by Stripe, and their privacy policy, here
                [https://stripe.com/us/privacy#data-we-collect].
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Email Data</p>
            </td>
            <td>
              <p>
                This personal data is used to enable NYA and our partners /
                service providers to send you marketing communications
                either:&nbsp;
                <br />
                <br />
              </p>
              <ul>
                <li>Via email;</li>
                <li>While using the NYA Service; and/or</li>
                <li>Direct from the third party.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <br />
        <br />
      </p>
      <ol start="6">
        <li>
          <strong>What do we use your personal data for?</strong>
        </li>
      </ol>
      <p>
        When you use or interact with the NYA Service, we use a variety of
        technologies to process the personal data we collect about you for
        various reasons.
      </p>
      <p>
        We have the right to process your personal data based on one or more of
        the following legal reasons:
      </p>
      <ul>
        <li>
          <strong>Legitimate Interest</strong>. We may process your personal
          data as required to pursue our legitimate business interests, provided
          our legitimate interests are not overridden by your rights and
          interests. For example, we may process your personal data to manage,
          develop and improve our products and services; support our customers
          and sales operations; protect our staff and assets; communicate
          information that supplements our products and services and ensure
          compliance with laws and regulations.
        </li>
        <li>
          <strong>Performance of an agreement</strong>. We may process your
          personal data to enter into agreements with you or to fulfill our
          obligations under agreements with you or your organization. This may
          include delivering and managing our products and services or allowing
          customers to use our products, services and supporting tools.
        </li>
        <li>
          <strong>Legal obligation</strong>. We may process your personal data
          to comply with applicable laws and regulations, establish or exercise
          our legal rights. For example, in connection with legal claims,
          compliance, regulatory and investigative purposes.
        </li>
        <li>
          <strong>Consent</strong>. In some instances, we may process your
          personal data based on your consent. This is most common where we
          cannot rely on an alternative legal basis or we are required by law to
          ask for your consent in the context of some of our sales and marketing
          activities, online data collection tools, or surveys. Where the
          processing of your personal data by us, is based on consent, you have
          the right to withdraw that consent without detriment at any time by
          contacting us at mydata@mail.neilyoungarchives.com.
        </li>
      </ul>
      <p>
        <br />
        <br />
      </p>
      <p>
        We have set out in the table below the reasons why we process your
        personal data, the associated legal bases we rely upon to legally permit
        us to process your personal data, and the categories of personal data
        used for these purposes:
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>
                  Description of why NYA processes your personal data
                  (&lsquo;processing purpose&rsquo;)
                </strong>
              </p>
            </td>
            <td>
              <p>
                <strong>Legal Basis for the processing purpose</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>
                  Categories of personal data used by NYA for the processing
                  purpose
                </strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                To provide, personalize, and improve your experience with the
                NYA Service and other services and products provided by NYA, for
                example by providing customized, personalized, or localized
                content, recommendations, features, and advertising on or
                outside of the NYA Service (including for third party products
                and services).
              </p>
            </td>
            <td>
              <ul>
                <li>Performance of an agreement</li>
                <li>Legitimate Interest</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Account Registration Data</li>
                <li>Service Usage Data</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                To understand how you access and use the NYA Service to ensure
                technical functionality of the NYA Service, develop new products
                and services, and analyze your use of the NYA Service, including
                your interaction with applications, advertising, products, and
                services that are made available, linked to, or offered through
                the NYA Service.
              </p>
            </td>
            <td>
              <ul>
                <li>Performance of an agreement</li>
                <li>Legitimate Interest</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Account Registration Data</li>
                <li>Service Usage Data</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p>To communicate with you for NYA Service-related purposes.</p>
            </td>
            <td>
              <ul>
                <li>Performance of an agreement</li>
                <li>Legitimate Interest</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Account Registration Data</li>
                <li>Service Usage Data</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                To process your payment, to prevent or detect fraud including
                fraudulent payments and fraudulent use of the NYA Service.
              </p>
            </td>
            <td>
              <ul>
                <li>Performance of an agreement</li>
                <li>Compliance with legal obligations</li>
                <li>Legitimate Interest</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Payment Data</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                To communicate with you, either directly or through one of our
                partners, for:&nbsp;
                <br />
                <br />
              </p>
              <ul>
                <li>marketing,</li>
                <li>promotional purposes,</li>
              </ul>
              <p>
                via emails, notifications, or other messages, consistent with
                any permissions you may have communicated to us.
              </p>
            </td>
            <td>
              <ul>
                <li>Consent</li>
                <li>Legitimate Interest</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Marketing Data</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                To provide you with features, information, advertising, or other
                content which is based on your specific location.
              </p>
            </td>
            <td>
              <ul>
                <li>Consent</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Voluntary Mobile Data</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <br />
        <br />
      </p>
      <ol start="7">
        <li>
          <strong>Sharing your personal data</strong>
        </li>
      </ol>
      <p>
        We have set out the categories of recipients of the personal data
        collected or generated through your use of the NYA Service.
      </p>
      <p>
        <em>Personal data you may choose to share</em>
      </p>
      <p>
        The following personal data will only be shared with the categories of
        recipients outlined in the table below if:
      </p>
      <ul>
        <li>
          you choose to make use of a specific NYA Service feature where sharing
          of particular personal data is required for the proper use of the NYA
          Service feature; or
        </li>
        <li>
          you grant us your permission to share the personal data, e.g. by
          selecting the appropriate setting in the NYA Service.
        </li>
      </ul>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>Categories of Recipients</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>Reason for sharing</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Third Party Applications you connect to your NYA Account</p>
            </td>
            <td>
              <p>
                If you connect your NYA account to a Third Party Application,
                such as, for example, social media or audio platforms, NYA may
                share your Service Usage Data so you can connect to your NYA
                account.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Third Party Applications you use to log into NYA</p>
            </td>
            <td>
              <p>
                If you log into a Third Party Application using your NYA account
                credentials, then that Third Party Application may have access
                to certain Service Usage Data such as your playlists, saved
                content and activity.&nbsp;
                <br />
                <br />
                You will receive a notification before connecting to the Third
                Party Application to let you know what personal data will be
                shared / accessible to that Third Party Application.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Artists and Record Labels</p>
            </td>
            <td>
              <p>
                We may share personal data (like your email address) with Neil
                (defined in the Terms of Use), or Neil&rsquo;s record label,
                including Warner Bros. Records, a Warner Music Group Company and
                its affiliates (collectively, &ldquo;
                <strong>Representatives</strong>&rdquo; as further defined in
                the Terms of Use) for the limited purposes of use in connection
                with Neil&rsquo;s, music business related activities but you can
                also revoke that consent at any time, through adjustments to
                your notification settings.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <br />
        <br />
      </p>
      <p>
        Learn more about how to manage notifications, your publicly available
        information, and what you share with others in Section 3&nbsp;of this
        Policy.
      </p>
      <p>
        <em>Information we may share</em>
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>Categories of Recipients</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>Reason for sharing</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Service Providers and Others</p>
            </td>
            <td>
              <p>
                We use technical service providers which may operate the
                technical infrastructure that we need to provide the NYA
                Service, in particular providers which host, store, manage, and
                maintain the NYA application, its content and the data we
                process.&nbsp;
              </p>
              <p>
                <br />
                We use technical service providers to help us communicate with
                you, as described in&nbsp;Section 6&nbsp;of this Policy.&nbsp;
              </p>
              <p>
                <br />
                We use marketing and advertising partners to show you more
                tailored content, or to help us understand your use of the NYA
                Service, to provide you with a better service. We also may share
                personal data with certain marketing and advertising partners to
                send you promotional communications about NYA.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>NYA Partners</p>
            </td>
            <td>
              <p>
                Depending on how you sign up for the NYA Service (e.g. through a
                third party service or a mobile provider), we share your NYA
                username or other Account Registration Data as necessary to
                enable your account.&nbsp;
              </p>
              <p>
                <br />
                We also may share your personal data in a pseudonymised format
                with our music industry partners to help them understand how the
                content they license to us is performing and to enable you to
                listen to streaming content via the NYA Service.&nbsp;
              </p>
              <p>
                <br />
                We also share your personal data in a pseudonymised format with
                marketing partners who help us with promotional efforts and with
                advertisers that allow us to offer a free service.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Other NYA Group Companies</p>
            </td>
            <td>
              <p>
                We will share your personal data with other NYA Group companies
                to carry out our daily business operations and to enable us to
                maintain and provide the NYA Service to you.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Law Enforcement and Data Protection Authorities</p>
            </td>
            <td>
              <p>
                We will share your personal data when we in good faith believe
                it is necessary for us to do so in order to comply with a legal
                obligation under applicable law, or respond to valid legal
                process, such as a search warrant, a court order, or a
                subpoena.&nbsp;
                <br />
                <br />
                We also will share your personal data where we in good faith
                believe that it is necessary for the purpose of our own, or a
                third party&rsquo;s legitimate interest relating to national
                security, law enforcement, litigation, criminal investigation,
                protecting the safety of any person, or to prevent death or
                imminent bodily harm, provided that we deem that such interest
                is not overridden by your interests or fundamental rights and
                freedoms requiring the protection of your personal data.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Purchasers of our business</p>
            </td>
            <td>
              <p>
                We will share your personal data in those cases where we sell or
                negotiate to sell our business to a buyer or prospective buyer.
                In this situation, NYA will continue to ensure the
                confidentiality of your personal data and give you notice before
                your personal data is transferred to the buyer or becomes
                subject to a different Privacy Policy.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <ol start="8">
        <li>
          <strong>Data retention and deletion</strong>
        </li>
      </ol>
      <p>
        We keep your personal data only as long as necessary to provide you with
        the NYA Service and for legitimate and essential business purposes, such
        as maintaining the performance of the NYA Service, making data-driven
        business decisions about new features and offerings, complying with our
        legal obligations, and resolving disputes. We keep some of your personal
        data for as long as you are a user of the NYA Service. For example, we
        keep your playlists, song library, and account information.
      </p>
      <p>
        If you request, we will delete or anonymize your personal data so that
        it no longer identifies you, unless we are legally allowed or required
        to maintain certain personal data, including situations such as the
        following:
      </p>
      <ul>
        <li>
          If there is an unresolved issue relating to your account, such as an
          outstanding credit on your account or an unresolved claim or dispute
          we will retain the necessary personal data until the issue is
          resolved;
        </li>
      </ul>
      <ul>
        <li>
          Where we are required to retain the personal data for our legal, tax,
          audit, and accounting obligations, we will retain the necessary
          personal data for the period required by applicable law; and/or,
        </li>
      </ul>
      <ul>
        <li>
          Where necessary for our legitimate business interests such as fraud
          prevention or to maintain the security of our users.
        </li>
      </ul>
      <ol start="9">
        <li>
          <strong>Transfer to other countries</strong>
        </li>
      </ol>
      <p>
        NYA shares your personal data globally with our Representatives in order
        to carry out the activities specified in this Policy. NYA may also
        subcontract processing to, or share your personal data with, third
        parties located in countries other than your home country. Your personal
        data, therefore, may be subject to privacy laws that are different from
        those in your country of residence.
      </p>
      <ol start="10">
        <li>
          <strong>Links</strong>
        </li>
      </ol>
      <p>
        We may display advertisements from third parties and other content that
        links to third-party websites. We cannot control or be held responsible
        for third parties&rsquo; privacy practices and content. If you click on
        a third-party advertisement or link, please understand that you are
        leaving the NYA Service and any personal data you provide will not be
        covered by this Policy. Please read their privacy policies to find out
        how they collect and process your personal data.
      </p>
      <ol start="11">
        <li>
          <strong>Keeping your personal data safe</strong>
        </li>
      </ol>
      <p>
        We are committed to protecting our users&rsquo; personal data. While we
        try to maintain the timeliness, integrity and security of the NYA
        Service, we do not guarantee that the NYA Service or any Third Party
        Services is or will be updated, complete, correct or secure or that any
        use of the NYA Service or any Third Party Services will be
        uninterrupted.&nbsp;Your password protects your user account, so we
        encourage you to use a unique and strong password, limit access to your
        computer and browser, and log out after having used the NYA Service.
      </p>
      <ol start="12">
        <li>
          <strong>Children</strong>
        </li>
      </ol>
      <p>
        The NYA Service is not directed to children under the age of 13 years.
        However, in some countries, stricter age limits may apply under local
        law. Please see our Terms of Use for further details.
      </p>
      <p>
        We do not knowingly collect personal data from children under 13 years
        or under the applicable age limit (the &ldquo;<strong>Age Limit</strong>
        &rdquo;). If you are under the Age Limit, please do not use the NYA
        Service, and do not provide any personal data to us.
      </p>
      <p>
        If you are a parent of a child under the Age Limit and become aware that
        your child has provided personal data to NYA, please contact us at
        mydata@mail.neilyounarchives.com, and you may request exercise of your
        applicable rights detailed in Section 3 of this Policy.
      </p>
      <p>
        If we learn that we have collected the personal data of a child under
        the age of 13 years, we will take reasonable steps to delete the
        personal data. This may require us to delete the NYA account for that
        child.
      </p>
      <ol start="13">
        <li>
          <strong>Changes to this Privacy Policy</strong>
        </li>
      </ol>
      <p>We may occasionally make changes to this Policy.</p>
      <p>
        When we make material changes to this Policy, we&rsquo;ll provide you
        with prominent notice as appropriate under the circumstances, e.g., by
        displaying a prominent notice within the NYA Service or by sending you
        an email. We may notify you in advance.
      </p>
      <p>Please, therefore, make sure you read any such notice carefully.</p>
      <ol start="14">
        <li>
          <strong>How to contact us</strong>
        </li>
      </ol>
      <p>
        Thank you for reading our Privacy Policy. If you have any questions
        about this Policy, please contact us by email at
        help@mail.neilyoungarchives.com, or please write to the following
        address: Shakey Pictures, Inc., P.O. Box 40063, Pasadena, 91114, Attn:
        Webmaster. Please note that email communications are not always secure,
        so please do not include credit card information or other sensitive
        information in your email messages to us.
      </p>
    </div>
  );
};

export default Terms;
