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
        <strong>NYA TERMS OF USE</strong>
      </p>
      <p>
        <strong>LAST UPDATED</strong>: <strong>November 26, 2018</strong>
      </p>
      <p>
        <strong>
          Please read this Terms of Use agreement carefully. Your use of the NYA
          Service (as defined below) constitutes your agreement to this Terms of
          Use agreement.{" "}
        </strong>
      </p>
      <p>
        This website and the related web properties (e.g., widgets and
        applications) (the &ldquo;<strong>Site</strong>&rdquo;), and any related
        mobile applications (&ldquo;<strong>Mobile Apps</strong>&rdquo;),
        (collectively the &ldquo;<strong>NYA Service</strong>&rdquo;) are
        operated by Shakey&nbsp;Pictures, Inc. (&ldquo;<strong>NYA</strong>
        ,&rdquo; &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>
        &rdquo;). We provide NYA Service users, at our discretion, with access
        to content and services (including the Streaming Service (as defined
        below in Section&nbsp;11)) related to us and to Neil Young (&ldquo;
        <strong>Neil</strong>&rdquo;), including music, images, forums, games,
        text, data and other content (such content and services, collectively,
        the &ldquo;<strong>Services</strong>&rdquo;). Your use of the NYA
        Service is governed by these Terms of Use&nbsp;(this &ldquo;
        <strong>Agreement</strong>&rdquo;), regardless of how you access the NYA
        Service. This Agreement is between you and us.
      </p>
      <p>
        PLEASE NOTE: The NYA Service may include or be used in connection with
        certain Third Party Services (as defined in Section&nbsp;18 below). Your
        access to or use of such Third Party Services may be governed by
        additional terms and conditions that are not set forth in this Agreement
        and that are made available by the particular providers of such Third
        Party Services.
      </p>
      <p>
        This Agreement contains a mandatory arbitration provision that, as
        further set forth in Section&nbsp;24 below, requires the use of
        arbitration on an individual basis to resolve disputes, rather than jury
        trials or any other court proceedings, or class actions of any kind.
      </p>
      <ol>
        <li>
          <strong> Acceptance of Terms</strong>. By using the NYA Service, you
          agree to the terms of this Agreement and to any additional rules and
          guidelines that we post on the NYA Service. We may make changes to
          this Agreement from time to time; we may notify you of such changes by
          any reasonable means, including by posting the revised version of this
          Agreement on the NYA Service. You can determine when we last changed
          this Agreement by referring to the &ldquo;<em>LAST UPDATED</em>&rdquo;
          legend above. Your use of the NYA Service following changes to this
          Agreement will constitute your acceptance of those changes; provided,
          however, any material change to this Agreement shall not apply
          retroactively to any claim or dispute between you and us in connection
          with this Agreement that arose prior to the &ldquo;LAST UPDATED&rdquo;
          date applicable to that version of this Agreement in which we included
          such material change. We may, at any time, without
          liability,&nbsp;modify or discontinue all or part(s) of the NYA
          Service or related functionality, including by limiting access to the
          NYA Service or such functionality for use only on a paid subscription
          basis; charge, modify or waive fees required to use the NYA Service or
          related functionality, including on a paid subscription basis; or
          offer opportunities to some or all NYA Service users.
        </li>
      </ol>
      <ol start="2">
        <li>
          <strong> Jurisdiction</strong>. The NYA Service is controlled and/or
          operated from the United States, and is not intended to subject us to
          non-U.S. jurisdiction or laws, except as otherwise expressly stated in
          this Agreement. The NYA Service may not be appropriate or available
          for use in some jurisdictions outside of the United States. If you
          access the NYA Service, you do so at your own risk, and you are
          responsible for complying with all local laws, rules and regulations
          in doing so. We may limit the NYA Service' availability, in whole or
          in part, to any person, geographic area or jurisdiction we choose, at
          any time and in our sole discretion and you agree not to circumvent,
          or attempt to circumvent, any such limitations we may impose from time
          to time.
        </li>
      </ol>
      <ol start="3">
        <li>
          <strong> Information You Submit</strong>. Your submission of
          information through the NYA Service is governed by our Privacy Policy,
          which is located
          at&nbsp;http://neilyoungarchives.com/privacy.html&nbsp;(the &ldquo;
          <strong>Privacy Policy</strong>&rdquo;). Further, to the extent that
          you submit any personally identifiable information to any third party
          (for example, a Representative (as defined in Section&nbsp;6(b) below)
          in connection with the NYA Service (for example, via a Third Party
          Application, as defined in Section&nbsp;18 below), such third party's
          collection, use and disclosure of such information may be governed by
          its own privacy policy, and not by our Privacy Policy. In any event,
          we are not responsible for the information collection, usage and
          disclosure practices of third parties. You represent and warrant that
          all information you provide to us is and will remain true, accurate
          and complete, and you will maintain and update such information
          regularly. If you choose to make any of your personally identifiable
          or other information publicly available on, through or in connection
          with the NYA Service, you do so at your own risk.
        </li>
      </ol>
      <ol start="4">
        <li>
          <strong> Rules of Conduct</strong>. In using the NYA Service, you
          agree to obey the law, respect the rights of others and avoid
          objectionable, defamatory or disruptive behavior. In addition, you
          will comply with the following &ldquo;
          <strong>Rules of Conduct</strong>&rdquo; as updated from time to time
          by us. In connection with the NYA Service, you will not:
        </li>
      </ol>
      <ul>
        <li>
          Post, transmit, or otherwise make available, through or in connection
          with the NYA Service:
        </li>
        <ul>
          <li>
            Anything that is or may be (a)&nbsp;threatening, harassing,
            degrading, hateful or intimidating or otherwise fail to respect the
            rights and dignity of others; (b)&nbsp;defamatory or libelous;
            (c)&nbsp;fraudulent or otherwise tortious; (d)&nbsp;obscene,
            indecent, pornographic or otherwise objectionable; or
            (e)&nbsp;protected by copyright, trademark, trade secret, right of
            publicity or privacy or other proprietary right without the express
            prior written consent of the owner of such right.
          </li>
          <li>
            Any material that would give rise to criminal or civil liability;
            that encourages conduct that constitutes a criminal offense; that
            promotes gambling; or that encourages or provides instructional
            information about illegal activities or activities such as
            &ldquo;hacking,&rdquo; &ldquo;cracking&rdquo; or
            &ldquo;phreaking.&rdquo;
          </li>
          <li>
            Any virus, worm, Trojan horse, Easter egg, time bomb, spyware or
            other computer code, file, or program that is or is potentially
            harmful or invasive or may or is intended to damage or hijack the
            operation of, or to monitor the use of, any hardware, software or
            equipment.
          </li>
          <li>
            Any unsolicited or unauthorized advertising, promotional materials,
            &ldquo;junk mail,&rdquo; &ldquo;spam,&rdquo; &ldquo;chain
            letter,&rdquo; &ldquo;pyramid scheme&rdquo; or investment
            opportunity, or any other form of solicitation.
          </li>
          <li>
            Any material non-public information about a company without the
            proper authorization to do so.
          </li>
        </ul>
        <li>Use the NYA Service for any fraudulent or unlawful purpose.</li>
        <li>
          Use the NYA Service to defame, abuse, harass, stalk, threaten or
          otherwise violate the legal rights of others, including without
          limitation others' privacy rights or rights of publicity, or harvest
          or collect personally identifiable information about other users of
          the NYA Service.
        </li>
        <li>
          Impersonate any person or entity, including any of our (or our
          Affiliates' (as defined in Section&nbsp;6(b) below)) representatives;
          falsely state or otherwise misrepresent your affiliation with any
          person or entity; or express or imply that we endorse any statement or
          posting you make.
        </li>
        <li>
          Interfere with, manipulate or disrupt the operation of the NYA Service
          or the servers or networks used to make the NYA Service available,
          including by artificially increasing play counts or otherwise using
          any automated processes to interfere with, manipulate or disrupt the
          operation of the NYA Service; or violate any requirements, procedures,
          policies or regulations of such networks.
        </li>
        <li>
          Restrict or inhibit any other person from using the NYA Service
          (including by hacking or defacing any portion of the NYA Service).
        </li>
        <li>
          Use the NYA Service to advertise or offer to sell or buy any goods or
          services without our express prior written consent.
        </li>
        <li>
          Reproduce, duplicate, copy, sell, resell or otherwise exploit for any
          commercial purposes, any portion of, use of, or access to the NYA
          Service.
        </li>
        <li>
          Reproduce, modify, adapt, translate, create derivative works of, sell,
          rent, lease, loan, timeshare, distribute or otherwise exploit any
          portion of (or any use of) the NYA Service except as expressly
          authorized herein, without our express prior written consent.
        </li>
        <li>
          Except as expressly permitted by applicable law, reverse engineer,
          decompile or disassemble any portion of the NYA Service.
        </li>
        <li>
          Remove any copyright, trademark or other proprietary rights notice
          from the NYA Service or materials originating from the NYA Service.
        </li>
        <li>
          Frame or mirror any part of the NYA Service, or otherwise incorporate
          any portion of the NYA Service into any product or service, without
          our express prior written consent.
        </li>
        <li>
          Systematically download and store all or any NYA Service content.
        </li>
        <li>
          Use any robot, spider, site search/retrieval application or other
          manual or automatic device to retrieve, index, &ldquo;scrape,&rdquo;
          &ldquo;data mine&rdquo; or otherwise gather NYA Service content or in
          any way reproduce or circumvent the navigational structure or
          presentation of the NYA Service, without our express prior, written
          consent.
        </li>
        <li>
          Circumvent, or attempt to circumvent, any digital rights management or
          other technology used to protect against unauthorized access, copying
          or other use of the NYA Service or any Services.
        </li>
      </ul>
      <p>
        Without limiting Section&nbsp;23 below, we may terminate your use of the
        NYA Service for any conduct that we consider to be inappropriate, or for
        your breach of this Agreement, including the Rules of Conduct
        (including, without limitation, if you repeatedly engage in copyright
        infringement via or in connection with the NYA Service).
      </p>
      <ol start="5">
        <li>
          <strong>Registration</strong>. You may need to register to use certain
          part(s) of the NYA Service. We reserve the right to reject, or require
          that you change, any user name, password or other information that you
          provide to us in registering. Your user name and password are for your
          personal use only and should be kept confidential; you, and not us,
          are responsible for any use or misuse of your user name and/or
          password, and you agree to promptly notify us of any confidentiality
          breach or unauthorized use of your user name and/or password, or your
          NYA Service account.
        </li>
      </ol>
      <ol start="6">
        <li>
          <strong> Submissions</strong>.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Generally</strong>. The NYA Service may contain areas where
          you can, through or in connection with the NYA Service, post or make
          available certain information and materials, including, without
          limitation, text, images, photographs, graphics, music, videos,
          audiovisual works, data, files, links and other materials&nbsp;(each,
          a &ldquo;<strong>Submission</strong>&rdquo;). For purposes of clarity,
          you retain ownership of any Submissions that you post or make
          available, subject to the terms and conditions of this Agreement
          (including the license grant in Section&nbsp;6(b) below). We have no
          control over and are not responsible for any use or misuse (including
          any distribution) by any third party of any Submissions.
        </li>
      </ol>
      <ol>
        <li>
          <strong>License Grant</strong>. For each Submission that you post or
          make available, you hereby grant to us and to our affiliates (&ldquo;
          <strong>Affiliates</strong>&rdquo;)a world-wide, royalty free, fully
          paid-up, non-exclusive, perpetual, irrevocable, transferable, and
          fully&nbsp;sub-licensable&nbsp;(through multiple tiers) license,
          without additional consideration to you or any third party, to:
          (i)&nbsp;reproduce, distribute, transmit, communicate to the public,
          perform and display (publicly or otherwise), edit, modify, adapt,
          create derivative works from and otherwise use, analyze and exploit
          such Submission, in any format or media now known or hereafter
          developed, on or in connection with the NYA Service;
          (ii)&nbsp;exercise all trademark, publicity and other proprietary
          rights with regard to such Submission; (iii)&nbsp;use your name,
          photograph, portrait, picture, voice, likeness and biographical
          information as provided by you in connection with your Submission for
          any promotional purposes related to the NYA Service, in each case, in
          connection with your Submission; and (iv)&nbsp;use your Submission
          (including the contents thereof) for any promotional or other business
          purposes related to the NYA Service. To clarify, we may sublicense
          these rights to Neil, to our licensors and service providers, and to
          Neil&rsquo;s record label, including Warner Bros. Records, a Warner
          Music Group Company and its affiliates (collectively &ldquo;
          <strong>Representatives</strong>&rdquo;), for the limited purposes of
          use in connection with Neil&rsquo;s, music business related
          activities. Also, nothing in this Agreement shall be deemed to
          authorize you to incorporate into any Submission any content or
          material owned by us, or by our Representatives. IF YOU DO NOT WISH TO
          GRANT THE RIGHTS GRANTED IN THIS SECTION&nbsp;6, PLEASE DO NOT POST OR
          MAKE AVAILABLE ANY SUBMISSIONS ON, THROUGH OR IN CONNECTION WITH THE
          NYA SERVICE.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Disclaimers</strong>. It is possible that NYA Service
          visitors will post or make available information or materials on,
          through or in connection with the NYA Service that are wrong or
          misleading or that otherwise violate this Agreement. We, Neil, our
          Affiliates and our and their respective Representatives do not endorse
          and are not responsible for any information or materials made
          available through or in connection with the NYA Service or your use of
          such information or materials. All Submissions will be deemed to be
          non-confidential and may be used by us (i)&nbsp;without any
          confidentiality or other non-disclosure obligations and
          (ii)&nbsp;without attribution to you or any third party. We reserve
          the right, in our sole discretion and at any time, to set limits on
          the number and size of any Submissions that may be posted or made
          available on, through or in connection with the NYA Service or the
          amount of storage space available for Submissions.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Acknowledgement</strong>. You hereby acknowledge and agree
          that (i)&nbsp;you have received good and valuable consideration in
          exchange for the rights granted by you hereunder in and to any
          Submission that you post or make available, including, without
          limitation, the ability to participate in activities on, through or in
          connection with the NYA Service and the possibility that publicity or
          favorable exposure may arise from our or our Affiliates' use of such
          Submission or any derivative works incorporating or embodying such
          Submission; and (ii)&nbsp;you are not entitled to any further
          compensation for any use or other exploitation of such Submission by
          us or our Affiliates or any other party (including, without
          limitation, Neil and our or their Affiliates' , Representatives)
          pursuant to the rights in such Submission that have been granted
          hereunder and/or that are available under applicable law.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Representations and Warranties</strong>. You hereby represent
          and warrant that: (i)&nbsp;you have the legal right and authority to
          enter into this Agreement; (ii)&nbsp;you solely own, or otherwise have
          the full right and permission to exploit, all of the rights in, to,
          and under any Submission that you post or make available and to grant
          the rights and licenses set forth herein, and with respect to any
          third party materials that appear in or are otherwise incorporated or
          embodied in any Submission that you post or make available, you have
          obtained express, written clearances from all owners of and rights
          holders in such third party materials as necessary to grant the rights
          and licenses set forth herein; (iii)&nbsp;you have obtained the
          written consent, release, and/or permission of every identifiable
          individual who appears in any Submission that you post or make
          available, to use such individual's name and likeness for purposes of
          using and otherwise exploiting such Submission(s) in the manner
          contemplated by the Agreement, or, if any such identifiable individual
          is under the age of eighteen&nbsp;(18), you have obtained such written
          consent, release and/or permission from such individual's parent or
          guardian (and you agree to provide to us a copy of any such consents,
          releases and/or permissions upon our request); (iv)&nbsp;any
          Submission that you post or make available, and the use thereof by us,
          our Affiliates, and our and their respective designees (including,
          without limitation, Neil, our and their respective Representatives),
          do not and shall not infringe upon or violate any patent, copyright,
          trademark, trade secret, or other intellectual property rights or
          other rights of any third party; (v)&nbsp;any Submission that you post
          or make available is not confidential and does not contain any
          confidential information; and (vi)&nbsp;in creating, preparing and
          posting or making available any Submission, you (A)&nbsp;have complied
          and will comply in all respects with all applicable laws, rules
          (including, without limitation, our Rules of Conduct), and regulations
          and (B)&nbsp;have not violated and will not violate any understanding
          by which you are explicitly or implicitly bound (including without
          limitation any agreement with any third party). If you do post or make
          available a Submission that contains the likeness of an identifiable
          individual, we strongly encourage you not to include any identifying
          information (such as the individual's name or address) within such
          Submission.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Waiver; Further Assurances; Indemnity</strong>. To the extent
          permitted under applicable law, you agree to forever release,
          discharge and waive all claims against us, Neil, our Affiliates and
          our and their respective Representatives from, and covenant not to
          initiate, file, maintain, or proceed upon any suit, claim, demand, or
          cause of action against us, Neil, our Affiliates and our and their
          respective Representatives with respect to, any and all claims,
          demands, actions, losses, costs, damages, liabilities, judgments,
          settlements and expenses (including, without limitation, reasonable
          attorneys' fees) that relate in any way to this Agreement and/or the
          use of any Submission in a manner consistent with the rights granted
          under this Agreement, including, without limitation, any claim for
          idea misappropriation. Additionally, to the extent permitted under
          applicable law, you hereby waive any and all rights that you may have
          under laws worldwide that concern &ldquo;moral rights&rdquo; or
          &ldquo;droit moral,&rdquo; or similar rights with respect to
          attribution or authorship or integrity of materials, in connection
          with any Submission that you post or make available (and you hereby
          represent and warrant that you have obtained clear, express written
          waivers from any applicable third parties with respect to any and all
          rights that such third parties may have under such laws in connection
          with any Submission that you post or make available). At any time upon
          our request, you shall: (i)&nbsp;take or cause to be taken all such
          actions as we may reasonably deem necessary or desirable in order for
          us and our Affiliates to obtain the full benefits of this Agreement
          and any licenses granted by you hereunder, and (ii)&nbsp;execute a
          non-electronic hard copy of this Agreement. Without limiting any other
          provision herein, you agree to indemnify us, our Affiliates, Neil, and
          our and their respective Representatives as further set forth herein,
          including in Section 22 below.
        </li>
      </ol>
      <ol>
        <li>
          <strong>No Obligation to Use</strong>. For the purpose of
          clarification, it shall be in our sole discretion whether or not to
          exercise any right granted to us under this Agreement, and we shall
          have no obligation to use or otherwise exploit any Submission.
        </li>
      </ol>
      <ol start="7">
        <li>
          <strong> Unsolicited Submissions</strong>. Notwithstanding anything to
          the contrary in this Agreement, we and our Affiliates do not accept,
          invite or consider unsolicited submissions of ideas, proposals or
          suggestions&nbsp;(&ldquo;<strong>Unsolicited Submissions</strong>
          &rdquo;), whether related to the NYA Service, our Products, Services
          or otherwise. We do not treat Unsolicited Submissions as confidential,
          and any Unsolicited Submission will become our or our Affiliates' sole
          property. We and our Affiliates have no obligations with respect to
          Unsolicited Submissions and may use them for any purpose whatsoever
          without compensation to you or any other person. You hereby
          acknowledge and agree that your provision of Unsolicited Submissions
          is gratuitous, unsolicited and without restriction, and does not place
          us under any fiduciary or other obligation.
        </li>
      </ol>
      <ol start="8">
        <li>
          <strong> Monitoring</strong>. We may, but have no obligation to:
          (a)&nbsp;monitor, evaluate or alter Submissions before or after they
          appear on the NYA Service; (b)&nbsp;seek to verify that all rights,
          consents, releases and permissions in or relating to such Submission
          have been obtained by you in accordance with your representations
          above; (c)&nbsp;refuse, reject or remove any Submission at any time or
          for any reason (including, without limitation, if we determine, in our
          sole discretion, that all rights, consents, releases and permissions
          have not been obtained by you despite your representations above); or
          (d)&nbsp;analyze your access to or use of the NYA Service. You agree
          to cooperate with us in our verification or inquiries related to any
          of the foregoing. We may disclose information regarding your access to
          and use of the NYA Service, including any
          Submissions,&nbsp;and&nbsp;the circumstances surrounding such access,
          use and the transmission of any such Submissions, to anyone for any
          reason or purpose, and in accordance with our Privacy Policy. If you
          become aware of any unlawful, offensive or objectionable material(s)
          on the NYA Service (except for material that infringes copyright,
          which is addressed in Section&nbsp;28 below), contact us at
          help@mail.neilyoungarchives.com with your name and address, a
          description of the material(s) at issue and the URL or location of
          such materials.
        </li>
      </ol>
      <ol start="9">
        <li>
          <strong>Your Limited Rights.</strong>Subject to your compliance with
          the terms and conditions of this Agreement, and solely for so long as
          you are permitted by us to use the NYA Service, you may view
          one&nbsp;(1) copy of any portion of the NYA Service to which we
          provide you access under this Agreement, on any single device, solely
          for your personal, non-commercial use.&nbsp;In connection with your
          use of the NYA Service (including any Services), you agree that we
          (directly or through our service providers) may make use of certain
          features of your device, including processing, bandwidth and
          storage-related features, in order to facilitate your use of the NYA
          Service.
        </li>
      </ol>
      <ol start="10">
        <li>
          <strong>Products. </strong>All rights in any products available
          through the NYA Service, such as music, ring tones, ring back tones,
          SMS tones, images (e.g., screen savers), video, artwork, text,
          software and other copyrightable materials (collectively, the &ldquo;
          <strong>Products</strong>&rdquo;) are owned by us, our Affiliates
          and/or our (or their) licensors. If a separate agreement provided by
          us or an Affiliate governs a particular Transaction (as defined in
          Section&nbsp;12 below) or Product, or your use of a particular
          Product, and the terms of such separate agreement conflict with the
          terms of this Agreement, the terms of such separate agreement will
          govern such Transaction (as defined in Section&nbsp;12 below) or use
          of such Product. Subject to your compliance with the terms and
          conditions of this Agreement and any other applicable terms and
          conditions imposed by us, our Affiliates and/or our (or their)
          licensors, you have a limited right to use those Products that you
          purchase or access through the NYA Service solely for your personal,
          noncommercial use in accordance with the terms and conditions of this
          Agreement and any other terms and conditions that may apply to such
          Products, which right you cannot sublicense to others. Any burning or
          exporting capabilities, if any, of any Product shall not constitute a
          grant or waiver of any of our rights or those of any copyright or
          other rights owners in such Product, any other Product or any content,
          sound recording, underlying musical composition, artwork or other
          copyrightable matter embodied in or associated with such Product or
          any other Product. You understand that the NYA Service and the
          Products may include and/or rely on a security framework using
          technology that protects digital information and imposes usage rules
          established by us, our Affiliates and our (or their) licensors, and
          you hereby agree to abide by such usage rules, including those set
          forth below.&nbsp;It is your responsibility to ascertain and obey all
          applicable local, state, federal and foreign laws (including minimum
          age requirements) regarding the purchase, possession and use of any
          Product.&nbsp;Unless we expressly provide otherwise, all Transactions,
          all Products and your use of such Products are subject to this
          Agreement.
        </li>
      </ol>
      <ol start="11">
        <li>
          <strong> Streaming Service.&nbsp;</strong>Subject to the terms of this
          Agreement, we may make available to you, in our sole discretion, a
          Service for the streaming of music through or in connection with the
          NYA Service (the &ldquo;<strong>Streaming Service</strong>&rdquo;).
          All rights in the Streaming Service (including any music made
          available through such service) are owned by us, our Affiliates and/or
          our (or their) licensors. If a separate agreement provided by us or
          any of our Affiliates governs a particular Transaction (as defined in
          Section&nbsp;12 below) for a subscription to the Streaming Service,
          and the terms of such separate agreement conflict with the terms of
          this Agreement, the terms of such separate agreement will govern such
          Transaction and/or use of the Streaming Service. Subject to your
          compliance with the terms and conditions of this Agreement and any
          other applicable terms and conditions imposed by us from time to time,
          our Affiliates and/or our (or their) licensors, we hereby grant you a
          limited, non-exclusive, revocable, non-transferable,
          non-sublicensable&nbsp;license to stream music made available by us as
          part of the Streaming Service from the NYA Service to a personal
          computer or portable device under your ownership and control, solely
          for your own personal non-commercial use. You may not use the
          Streaming Service in connection with a business or for the benefit of
          any other person or entity. You agree not to download or otherwise
          make any copies of any streamed music. The Streaming Service, and any
          music made available pursuant to such service, is licensed, and not
          sold. All rights to the Streaming Service not specifically granted to
          you in this Section&nbsp;11 are reserved to us, our Affiliates and/or
          our (or their) licensors. We reserve the right to limit (a)&nbsp;the
          number of devices with which you can access the Streaming Service or
          (b)&nbsp;simultaneous streaming to two or more devices. You understand
          that the Streaming Service may include and/or rely on a security
          framework using technology that protects digital information and
          imposes usage rules established by us, our Affiliates and our (or
          their) licensors, and you hereby agree to abide by such usage rules,
          including those set forth below.&nbsp;It is your responsibility to
          ascertain and obey all applicable local, state, federal and foreign
          laws (including minimum age requirements) regarding your access to
          and/or use of the Streaming Service.&nbsp;Unless we expressly provide
          otherwise, the Streaming Service and your use of the Streaming Service
          are subject to the terms of this Agreement, including the usage
          restrictions set forth in Section&nbsp;14 below.&nbsp;
        </li>
      </ol>
      <ol start="12">
        <li>
          <strong>
            {" "}
            Purchases of Products or Services; Subscriptions and Autorenewals.
          </strong>
        </li>
      </ol>
      <ol>
        <li>
          <strong> Generally. </strong>If you wish to purchase any Products or
          subscribe to any Services (including the Streaming Service) made
          available through or in connection with the NYA Service (each such
          purchase or subscription, a &ldquo;<strong>Transaction</strong>
          &rdquo;), you may be asked to supply certain information in connection
          with such Transaction, including without limitation your credit card
          number or other payment account number (for example, your wireless
          account number), your billing address, and your shipping information.
          BY INITIATING A TRANSACTION, YOU REPRESENT AND WARRANT THAT YOU
          (A)&nbsp;ARE EIGHTEEN (18) YEARS OF AGE OR OLDER AND (B)&nbsp;HAVE THE
          LEGAL RIGHT TO USE THE PAYMENT MEANS SELECTED BY YOU. By submitting
          such information to us or our third party processor, and/or Warner
          Bros. Records, you grant to us the right to use such information in
          accordance with our Privacy Policy, including, without limitation, by
          providing such information to our processor, Warner Bros. Records and
          other third parties for purposes of facilitating the completion of
          Transactions initiated by you or on your behalf. We may charge your
          card or account at our convenience but within thirty (30) days of
          authorization. Verification of information may be required prior to
          the acknowledgment or completion of any Transaction.&nbsp;By making a
          Transaction, you represent that, as applicable any Services and/or any
          Products will be used only in a lawful manner.
        </li>
      </ol>
      <p>
        For any product or service that you order on or in connection with the
        Services, you agree to pay the price applicable (including any sales
        taxes and surcharges) as of the time you submit the order. We or our
        card processor will automatically bill your credit, debit or other
        payment card (the &ldquo;<strong>Card</strong>&rdquo;) or other form of
        payment submitted as part of the order process for such price. We may
        offer a number of membership plans, including special promotional plans
        or memberships with differing conditions and limitations. Any materially
        different terms from those described in this Agreement will be disclosed
        at your sign-up or in other communications made available to you. Some
        promotional memberships are offered by third parties in conjunction with
        the provision of their own products and services. We are not responsible
        for the products and services provided by such third parties. We reserve
        the right to modify, terminate or otherwise amend our offered membership
        plans.
      </p>
      <ol>
        <li>
          <strong> Subscription Term and Termination</strong>. Except in the
          event of a free trial offer, your subscription will commence as of the
          date your payment for a subscription is received by us. Your
          subscription will continue in full force for the length of the term
          you specifically purchased or on a month-to-month term until such time
          as you cancel the subscription as further explained below (the &ldquo;
          <strong>Subscription Term</strong>&rdquo;). If you cancel a
          subscription in the middle of your Subscription Term, your right to a
          refund is set forth in Section 12(f) below. We will have the right,
          upon written notice to you, to terminate this Agreement, and suspend
          your access to their subscription, if: (a) you fail to pay us any
          amount due under this Agreement; and/or (b) you materially breach any
          term or condition of this Agreement. We shall have the right to
          terminate this Agreement and suspend your access to the subscription
          with or without cause, upon thirty (30) days written notice to you in
          which case you will no longer be charged for access to the
          subscription. Upon the expiration or termination of this Agreement for
          any reason, your access to, and use of, their subscription will
          terminate.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Free Trials/Promotional Offerings</strong>. We may offer
          promotional trial subscriptions to access the Services for free for a
          limited time or at special discounted prices. If you sign up for a
          trial use, your rights to use the Services are limited by the terms of
          such trial and will terminate or renew on the terms of your trial
          arrangement and/or any applicable Additional Terms. Please be aware
          that when you sign up for a free trial, you will be required to
          provide your Card number and we will confirm your Card is valid. When
          we process your Card, some credit card companies may place a temporary
          hold on your account for your first payment. Please contact your Card
          company if you have questions. Please note that we do not provide
          price protection or refunds in the event of a price drop or
          promotional offering.
        </li>
      </ol>
      <p>
        ONCE YOUR FREE TRIAL ENDS , WE OR A THIRD PARTY PAYMENT PROCESSOR WILL
        BEGIN BILLING YOUR DESIGNATED PAYMENT METHOD ON A RECURRING BASIS FOR
        YOUR SUBSCRIPTION (PLUS ANY APPLICABLE TAXES AND OTHER CHARGES), UNLESS
        YOU CANCEL YOUR SUBSCRIPTION PRIOR TO THE END OF YOUR FREE TRIAL. IF
        YOUR FREE TRIAL ENDS AND YOUR SUBSCRIPTION BEGINS, YOUR SUBSCRIPTION
        WILL AUTORENEW AND YOU WILL BE BILLED ON A RECURRING BASIS FOR YOUR EACH
        SUBSCRIPTION PERIOD UNLESS YOU CANCEL. INSTRUCTIONS FOR CANCELING YOUR
        MEMBERSHIP SUBSCRIPTION ARE DESCRIBED BELOW. PLEASE NOTE THAT YOU WILL
        NOT RECEIVE A NOTICE FROM US THAT YOUR FREE TRIAL HAS ENDED OR THAT THE
        PAID PORTION OF YOUR SUBSCRIPTION HAS BEGUN. WE RESERVE THE RIGHT TO
        MODIFY OR TERMINATE FREE TRIALS AT ANY TIME, WITHOUT NOTICE AND IN OUR
        SOLE DISCRETION.
      </p>
      <ol>
        <li>
          <strong> Autorenewals of Subscription Membership</strong>. Your
          subscription to the Services will automatically renew at the end of
          your Subscription Term continuously and indefinitely without action by
          you, and the subscription membership fee will be charged to you at the
          time of renewal. Once your membership fee has been paid you will be
          entitled to all privileges included in the membership until the
          membership is cancelled by you as set forth in the paragraph below. By
          providing your payment method information for your subscription, you
          are agreeing to pay a subscription fee (and any applicable taxes and
          service fees (collectively, &ldquo;<strong>Fees</strong>&rdquo;), that
          will automatically renew, at the then current rate, unless you cancel
          prior to the expiration of the current Subscription Term. The Fees
          will be charged to your original payment method automatically at the
          beginning of your Subscription Term, and at the beginning of each
          renewal Subscription Term thereafter on the calendar day corresponding
          to the commencement of your current Subscription Term, unless you
          cancel your subscription, or your account is suspended or terminated
          pursuant to this Agreement. The renewal Subscription Term will be the
          same length as your initial Subscription Term unless otherwise
          disclosed to you at the time of sale. The rate for the renewal
          Subscription Term will be the then current subscription-rate. The Fees
          charged to your payment method may vary from Subscription Term to
          Subscription Term due to changes in your subscription plan or
          applicable taxes, and you authorize us to charge your payment method
          for these amounts. We reserve the right to change the pricing of
          subscription at any time. In the event of a price change, we will post
          the new pricing on the Services and attempt to notify you in advance
          by sending an email to the address you have registered for your
          account. You agree that We may change the pricing We charge you for
          your subscription and any Products/Services offered in your
          subscription package by providing you with notice through an
          electronic communication from us and you agree that all agreements,
          notices, disclosures, and/or any other communications that We provide
          to you electronically satisfy any legal requirement that such
          communications be in writing. You consent to our ability to change our
          pricing and the details of our subscription packages through an
          electronic communication to you. If you do not wish to accept a price
          or subscription package change made by us, you may cancel your
          subscription as described below, otherwise you will be deemed to have
          consented to the price/subscription package change and authorize us to
          charge the new Fees to your payment method. If there are any
          discrepancies in billing, you hereby waive your right to dispute such
          discrepancies if you do not notify us within sixty (60) days after
          they first appear on an account statement.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Cancellation of Subscription Membership.</strong> You have
          the right to cancel your subscription membership at any time upon
          notice to us. To cancel your subscription membership: open your
          account in the NYA Service, and click &ldquo;Subscription,&rdquo; then
          click &ldquo;Cancel Membership,&rdquo; and then confirm your
          cancellation on the next page. To avoid a late cancellation fee or
          forfeiture of the membership renewal fee, membership must be cancelled
          prior to the end of the then current Subscription Term. Upon
          cancellation, you will lose access to the areas of the Services
          designated for subscription members only.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Refund Policy</strong> All purchase transactions made through
          or in connection with the Services are subject to our return policy in
          effect at the time of purchase. Currently, our refund policy is (i)
          for a month-to-month subscription, to provide a full month refund if
          you cancel within seven (7) days of the applicable renewal date, and
          (2) for annual subscriptions, to provide a pro-rata refund of the
          unused portion of the remainder of that Subscription Term (measured as
          of the end of the then-current month in which the cancellation occurs
          if you cancel within thirty (30) days of the applicable renewal date.
          Cancellation of your renewed membership any time after that time
          period will result in forfeiture of the remaining membership fee for
          that renewal period. There are no refunds or credits for partial
          months.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Order Acceptance Policy</strong>. Your receipt of an
          electronic or other form of order confirmation does not signify our
          acceptance of your order, nor does it constitute confirmation of our
          offer to sell. We reserve the right at any time after receipt of your
          order to accept or decline your order for any reason. We further
          reserve the right any time after receipt of your order, without prior
          notice to you, to supply less than the quantity you ordered of any
          item. your order will be deemed accepted by us upon our delivery of
          Products and/or Services that you have ordered. We may require
          additional verifications or information before accepting any order.
          Notwithstanding the foregoing, You agree that, if we cancel all or a
          portion of your order or if we provide you less than the quantity you
          ordered, your sole and exclusive remedy is either that: (a) we will
          issue a credit to your Card account in the amount charged for the
          cancelled portion or the quantity not provided (if your Card has
          already been charged for the order); or (b) we will not charge your
          Card for the cancelled portion of the order or the quantity not
          provided. Do not assume that a cancellation or change of an order you
          have placed with us has been effected until you receive a confirmation
          from us via email or the Services. As stated above, you will be
          responsible for, and your Card or third-party payment account may be
          charged for, the payment of all fees associated with orders already
          processed or shipped before your cancellation/change request or a
          request to terminate your account was received.
        </li>
      </ol>
      <ol>
        <li>
          <strong> Methods of Payment; Credit Card Terms and Taxes</strong>. You
          shall pay all charges that may be incurred by you or on your behalf
          through or in connection with the NYA Service, at the price(s) in
          effect when such charges are incurred, including without limitation
          all shipping and handling charges, and any applicable network, data or
          other charges in respect of mobile downloads. In addition, you remain
          responsible for any taxes (including, if applicable, VAT and/or any
          import duties) that may be applicable to your Transaction(s). Except
          to the extent applicable law provides otherwise, all sales through or
          in connection with the NYA Service are final, and all charges from
          those sales are nonrefundable, except as otherwise expressly set forth
          in this Agreement. All payments to us are made through a third party
          payment processor(s). We accept any and all methods of payment that
          our third party payment processor(s) accept. We currently do not
          accept cash, personal or business checks or any other payment form,
          although in the future we may change this policy. Your Card issuer
          agreement governs your use of your designated Card, and you must refer
          to that agreement and not this Agreement to determine your rights and
          liabilities as a cardholder. You represent and warrant that you will
          not use any Card or other form of payment unless you have all
          necessary legal authorization to do so.{" "}
          <strong>
            YOU, AND NOT US, ARE RESPONSIBLE FOR PAYING ANY UNAUTHORIZED AMOUNTS
            BILLED TO YOUR CARD BY A THIRD PARTY
          </strong>
          . You agree to pay all fees and charges incurred in connection with
          your purchases (including any applicable taxes) at the rates in effect
          when the charges were incurred. Unless you notify us of any
          discrepancies within sixty (60) days after they first appear on your
          Card statement, you agree that they will be deemed accepted by you for
          all purposes. If we do not receive payment from your Card issuer or
          its agent, you agree to pay all amounts due upon demand by us or our
          agents.
        </li>
      </ol>
      <ol start="13">
        <li>
          <strong> Product Delivery; Service Access</strong>. Except to the
          extent prohibited by applicable law, we reserve the right to change
          Product delivery or Service access options without notice. On
          occasion, technical and other problems may delay or prevent delivery
          of a particular Product or Service. Except to the extent that
          applicable law provides otherwise, your sole and exclusive remedy with
          respect to any Product or Service that is not delivered within a
          reasonable period will be either replacement of such Product or
          Service or a refund of the purchase price paid for such Product or
          Service, as determined by us in our sole discretion.
        </li>
      </ol>
      <ol start="14">
        <li>
          <strong> Usage Restrictions for Products or Services.</strong>All
          Products or Services you purchase, obtain or access on, through or in
          connection with the NYA Service are solely for your personal,
          non-commercial use. Except as otherwise expressly provided herein, you
          may not reproduce, publish, transmit, distribute, display, broadcast,
          re-broadcast, modify, create derivative works from, sell or
          participate in any sale of or exploit in any way, in whole or in part,
          directly or indirectly, any of the Products or Services (including any
          streamed music), or any related software. Except as permitted under
          applicable law, you may not reverse engineer, decompile, disassemble,
          modify or disable any Products or Services, or any copyright
          protection or use limitation systems associated with the Products or
          Services. You may not play and then re-digitize any Products or
          Services (including any streamed music), or upload any Products or
          Services, or derivatives thereof to the Internet. Unless expressly
          permitted by us, you may not use the Products or Services in
          conjunction with any other content, including without limitation, in
          conjunction with any other Products or Services (e.g.,&nbsp;to provide
          sound for video). You may not transfer, sell or offer to sell the
          Products or Services, including, without limitation, posting any
          Product or Service-related content for auction on any Internet auction
          site or &ldquo;trading&rdquo; the Products or Services for money,
          goods or services. You are not granted any commercial sale, resale,
          reproduction, distribution or promotional use rights in connection
          with Products or Services (including any Services-related content) or
          any rights that require a synchronization or public performance
          license with respect to an underlying musical composition.
          Additionally, the following usage restrictions apply based on the type
          of Product you are purchasing or obtaining through the NYA Service:
        </li>
      </ol>
      <table>
        <tbody>
          <tr>
            <td>
              <p>PRODUCT OR SERVICE TYPE</p>
            </td>
            <td>
              <p>TERMS OF USAGE</p>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <p>
                <em>Full Permanent Non-MP3 Digital Audio Downloads</em>
              </p>
            </td>
            <td>
              <p>
                <em>Personal Computers:</em>&nbsp;You may not activate any audio
                track purchased or obtained via the NYA Service on more than
                three (3) desktop or laptop computers. <br />
                <em>CD Burning:</em>&nbsp;You may not make more than seven (7)
                burns of a particular playlist (such as an album) to a CD or
                similar media.
                <br />
                <em>Portable Devices:</em>&nbsp;You may not transfer audio
                tracks purchased or obtained via the NYA Service from a personal
                computer to more than three (3) mobile phones or tablets (or to
                any cellular telephone or other device capable of cellular or
                WAP communication).
              </p>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <p>
                <em>Full Permanent Digital Video Downloads</em>
              </p>
            </td>
            <td>
              <p>
                <em>Personal Computers:</em>&nbsp;You may not activate any video
                purchased or obtained via the NYA Service on more than three (3)
                desktop or laptop computers. <br />
                <em>No DVD Burning:</em>&nbsp;You may not burn to DVD or similar
                media any digital copy of a purchased video. <br />
                <em>Portable Devices:</em>&nbsp;You may not transfer videos
                purchased or obtained via the NYA Service from a personal
                computer to more than three (3) mobile phones or tablets (or to
                any cellular telephone or other device capable of cellular or
                WAP communication).
              </p>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <p>
                <em>Digital Video Rentals</em>
              </p>
            </td>
            <td>
              <p>
                Limited-time downloads or limited-access streaming to a personal
                computer or portable device, including mobile devices, is
                permitted for a period of 24 hours or such other limited time
                period as specified in the particular offering pursuant to which
                the rental occurs.
              </p>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <p>
                <em>Digital Audio Streaming Service</em>
              </p>
            </td>
            <td>
              <p>
                Limited-access streaming to a personal computer or portable
                device is permitted solely through the NYA Service for so long
                as we make such streaming capability available to you or such
                other limited time period as specified in an applicable
                Transaction (including in a series of Transactions on a
                subscription basis). We reserve the right to limit (a)&nbsp;the
                number of devices with which you can access the Streaming
                Service or (b)&nbsp;simultaneous streaming to two or more
                devices
              </p>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <p>
                <em>Other</em>
              </p>
            </td>
            <td>
              <p>
                Any other types of digital products or services sold or offered
                on or in connection with this NYA Service are subject to the
                terms set forth in the specific offering pursuant to which the
                sale or other type of offering occurs. In the event of a
                conflict between these Terms of Usage and the terms and
                conditions set forth in such specific offering, the terms of the
                specific offering shall govern.
              </p>
            </td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
      <ol start="15">
        <li>
          <strong> Product and Service Requirements; Compatibility</strong>. You
          acknowledge that use of our Products and Services requires other
          hardware and software tools (e.g., in the case of full permanent audio
          downloads, for making copies of Products on physical media and
          rendering performance of Products on authorized digital player
          devices), and that such hardware and software, including, without
          limitation, all charges therefor, are your sole responsibility. To the
          extent permissible under applicable law, we, Neil, our Affiliates and
          our (and their) Representatives shall not be responsible or liable for
          the loss or damage of any Product or Service. Except to the extent
          prohibited by applicable law, we reserve the right to change at any
          time, with or without prior notice to you, the software or hardware
          required to download, transfer, copy and/or use or limit the use of
          any Products or Services.
        </li>
      </ol>
      <ol start="16">
        <li>
          <strong> Rules for Promotions</strong>. Any sweepstakes, contests,
          raffles, surveys, games or other promotions (collectively, &ldquo;
          <strong>Promotions</strong>&rdquo;) made available through the NYA
          Service may be governed by rules that are separate from this
          Agreement. If you participate in any Promotions, please review the
          applicable rules in addition to our Privacy Policy. If the rules for a
          Promotion conflict with this Agreement, the Promotion rules will
          govern with respect to such Promotion.
        </li>
      </ol>
      <ol start="17">
        <li>
          <strong> Our Proprietary Rights</strong>. Except and solely to the
          extent of any explicit license granted hereunder, we, our Affiliates
          and our respective licensors and suppliers (including our
          Representatives)own all right, title and interest in and to the NYA
          Service and the information and materials made available through or in
          connection with the NYA Service. Such information and materials are
          protected by copyright, trademark, patent and/or other proprietary
          rights and laws. Except as expressly authorized in advance by us, you
          agree not to reproduce, modify, rent, lease, loan, sell, distribute or
          create derivative works based on, all or any part of the NYA Service
          or any information or materials made available through or in
          connection with the NYA Service.
        </li>
      </ol>
      <p>
        We, our Affiliates and/or our respective licensors or suppliers
        (including our Representatives) own the trade names, trademarks and
        service marks on the NYA Service, and any associated logos. All trade
        names, trademarks, service marks or logos on the NYA Service not owned
        by us or our Affiliates are the property of their respective owners. You
        may not use our trade names, trademarks, service marks or logos in
        connection with any product or service that is not ours, or in any
        manner that is likely to cause confusion. Nothing contained on the NYA
        Service should be construed as granting any license or right to use any
        trade names, trademarks, service marks or logos without express prior
        written consent of the owner.&nbsp;
      </p>
      <p>
        PLEASE NOTE THAT UNAUTHORIZED USE OF THE SITE OR ANY SERVICE OR PRODUCT,
        INCLUDING, WITHOUT LIMITATION, ANY SOFTWARE USED BY THE SITE OR ANY
        SERVICE, MAY SUBJECT YOU TO CIVIL AND CRIMINAL PENALTIES, (INCLUDING,
        WITHOUT LIMITATION, POSSIBLE MONETARY DAMAGES), INCLUDING, WITHOUT
        LIMITATION, FOR COPYRIGHT INFRINGEMENT.
      </p>
      <ol start="18">
        <li>
          <strong> Third Party Services</strong>. The NYA Service may include
          third party software applications and services (or links thereto) that
          are made available by our Representatives(&ldquo;
          <strong>Third Party Services</strong>&rdquo;). Because we do not
          control Third Party Services, you agree that neither we , Neil, nor
          our Affiliates, nor our (nor their) respective Representatives , are
          responsible or liable for any Third Party Services, including the
          performance, accuracy, integrity, quality, legality, usefulness,
          timeliness, completeness, reliability or safety of, or intellectual
          property rights relating to, Third Party Services or their use. We
          have no obligation to monitor Third Party Services, and we may remove
          or restrict access to any Third Party Services (in whole or part) from
          the NYA Service at any time. The availability of Third Party Services
          on the NYA Service does not imply our endorsement of, or our
          affiliation with any Representative of, such Third Party Services.
          Further, your use of Third Party Services may be governed by
          additional terms and conditions that are not set forth in this
          Agreement or our Privacy Policy (for example, terms and conditions
          that are made available by Representatives themselves in connection
          with Third Party Services). This Agreement does not create any legal
          relationship between you and providers with respect to Third Party
          Services, and nothing in this Agreement shall be deemed to be a
          representation or warranty by us, Neil, or any of our Affiliates, or
          our or their respective Representatives, with respect to any Third
          Party Application.
        </li>
      </ol>
      <ol start="19">
        <li>
          <strong> Third Party Content</strong>. The NYA Service may incorporate
          certain functionality that allows, via the system or network of which
          the NYA Service is a component, the routing and transmission of, and
          online access to, certain digital communications and content made
          available by third parties, including Submissions (&ldquo;
          <strong>Third Party Content</strong>&rdquo;). By using such NYA
          Service functionality, you acknowledge and agree that you are
          directing us to access, route and transmit to you Third Party Content
          associated with such functionality. Because we do not control Third
          Party Content, you agree that we are neither responsible nor liable
          for any Third Party Content, including the accuracy, integrity,
          quality, legality, usefulness, timeliness, completeness, reliability
          or safety of, or intellectual property rights relating to, Third Party
          Content. Certain Third Party Content may, among other things, be
          inaccurate, misleading or deceptive. We have no obligation to monitor
          Third Party Content, and we may block or disable access to any Third
          Party Content (in whole or part) via the NYA Service at any time. Your
          access to or receipt of Third Party Content via the NYA Service does
          not imply our endorsement of, or our affiliation with any provider of,
          such Third Party Content. Further, your use of Third Party Content may
          be governed by additional terms and conditions that are not set forth
          in this Agreement or our Privacy Policy (for example, terms and
          conditions that are made available by the providers of such Third
          Party Content). This Agreement does not create any legal relationship
          between you and the providers of such Third Party Content with respect
          to such Third Party Content, and nothing in this Agreement shall be
          deemed to be a representation or warranty by us, Neil, or any of our
          Affiliates, or our or their respective Representatives, with respect
          to any Third Party Content.
        </li>
      </ol>
      <ol start="20">
        <li>
          <strong> Links and Feeds</strong>. The NYA Service may provide links
          to or feeds from other web sites and online resources. We and our
          Affiliates are not responsible for and do not endorse such external
          sites or resources. Other sites may link to the NYA Service with or
          without our authorization, and we may block any links to or from the
          NYA Service. YOUR ACCESS TO AND USE OF THIRD PARTY WEB SITES, CONTENT
          AND RESOURCES IS AT YOUR OWN RISK&nbsp;AND IS SUBJECT TO ANY
          ADDITIONAL TERMS, CONDITIONS AND POLICIES APPLICABLE TO SUCH THIRD
          PARTY WEB SITES, CONTENT AND RESOURCES (SUCH AS TERMS OF SERVICE OR
          PRIVACY POLICIES OF THE PROVIDERS OF SUCH THIRD PARTY WEB SITES,
          CONTENT AND RESOURCES).
        </li>
      </ol>
      <ol start="21">
        <li>
          <strong> Limitations of Liability and Disclaimers.</strong> THE NYA
          SERVICE AND ALL GOODS, SERVICES, PRODUCTS, THIRD PARTY SERVICES, THIRD
          PARTY CONTENT, INFORMATION AND MATERIALS MADE AVAILABLE THROUGH THE
          NYA SERVICE ARE PROVIDED TO YOU &ldquo;AS IS&rdquo; WITHOUT ANY
          EXPRESS REPRESENTATIONS OR WARRANTIES OF ANY KIND, AND WE, NEIL, OUR
          AFFILIATES AND OUR AND THEIR RESPECTIVE REPRESENTATIVES DISCLAIM ALL
          STATUTORY OR IMPLIED REPRESENTATIONS, WARRANTIES, TERMS AND CONDITIONS
          WITH RESPECT TO THE NYA SERVICE AND ALL GOODS, SERVICES, PRODUCTS,
          THIRD PARTY SERVICES, THIRD PARTY CONTENT, INFORMATION AND MATERIALS
          MADE AVAILABLE THROUGH THE NYA SERVICE, INCLUDING THE REPRESENTATIONS
          AND WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, NONINFRINGEMENT AND TITLE. (CERTAIN
          REPRESENTATIVES MAY SEPARATELY PROVIDE LIMITED REPRESENTATIONS AND/OR
          WARRANTIES REGARDING THEIR THIRD PARTY SERVICES; PLEASE CHECK WITH
          SUCH REPRESENTATIVES FOR FURTHER INFORMATION.) WE, NEIL, OUR
          AFFILIATES AND OUR AND THEIR RESPECTIVE REPRESENTATIVES MAKE NO
          REPRESENTATION OR WARRANTY THAT THE NYA SERVICE (OR ANY PART THEREOF),
          OR ANY GOODS, SERVICES, PRODUCTS, THIRD PARTY SERVICES, THIRD PARTY
          CONTENT, INFORMATION OR MATERIALS MADE AVAILABLE THROUGH THE NYA
          SERVICE IS OR WILL BE ACCURATE, COMPLETE, ERROR-FREE, OR COMPATIBLE
          WITH ANY PARTICULAR SOFTWARE OR HARDWARE. FURTHER, WE, NEIL, OUR
          AFFILIATES AND OUR AND THEIR RESPECTIVE REPRESENTATIVES MAKE NO
          REPRESENTATION OR WARRANTY THAT ANY SOFTWARE, HARDWARE, EQUIPMENT OR
          OTHER DEVICE OR SYSTEM USING THE NYA SERVICE OR ANY GOODS, SERVICES,
          PRODUCTS, THIRD PARTY SERVICES, THIRD PARTY CONTENT, INFORMATION OR
          MATERIALS MADE AVAILABLE THROUGH THE NYA SERVICE WILL FUNCTION IN ANY
          MANNER. YOU HEREBY AGREE THAT IT IS YOUR SOLE RESPONSIBILITY TO (A)
          OBTAIN AND PAY FOR ANY SOFTWARE, HARDWARE OR SERVICES (INCLUDING
          INTERNET CONNECTIVITY) NEEDED TO USE THE NYA SERVICE AND (B) ENSURE
          THAT ANY SOFTWARE, HARDWARE, EQUIPMENT, DEVICES, SYSTEMS OR SERVICES
          THAT YOU USE WILL FUNCTION CORRECTLY WITH THE NYA SERVICE AND ANY
          GOODS, SERVICES, PRODUCTS, THIRD PARTY SERVICES, THIRD PARTY CONTENT,
          INFORMATION OR MATERIALS MADE AVAILABLE THROUGH THE NYA SERVICE. YOU
          AGREE THAT YOU MUST EVALUATE, AND THAT YOU BEAR ALL RISKS ASSOCIATED
          WITH, THE USE OF THE NYA SERVICE, INCLUDING ANY RELIANCE ON THE
          ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY THIRD PARTY SERVICES,
          THIRD PARTY CONTENT, INFORMATION OR MATERIALS MADE AVAILABLE THROUGH
          THE NYA SERVICE.&nbsp;ALL DISCLAIMERS OF ANY KIND (INCLUDING IN THIS
          SECTION AND ELSEWHERE IN THIS AGREEMENT) ARE MADE FOR THE BENEFIT OF
          US, NEIL, OUR AFFILIATES AND OUR AND THEIR RESPECTIVE REPRESENTATIVES,
          AND THEIR RESPECTIVE SUCCESSORS AND ASSIGNS.
        </li>
      </ol>
      <p>
        WE, NEIL, OUR AFFILIATES AND OUR AND THEIR RESPECTIVE REPRESENTATIVES,
        AND OUR AND THEIR RESPECTIVE SUCCESSORS AND ASSIGNS, WILL NOT BE LIABLE
        IN CONNECTION WITH THE NYA SERVICE FOR ANY INDIRECT, INCIDENTAL,
        CONSEQUENTIAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES OF ANY KIND, UNDER
        ANY CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHER
        THEORY, INCLUDING DAMAGES FOR LOSS OF PROFITS, LOSS OR INTERRUPTION OF
        BUSINESS, LOSS OF USE, LOSS OF DATA, LOSS OF OTHER INTANGIBLES, LOSS OF
        SECURITY OF INFORMATION YOU HAVE PROVIDED IN CONNECTION WITH YOUR USE OF
        THE NYA SERVICE (INCLUDING, WITHOUT LIMITATION, IN CONNECTION WITH YOUR
        USE OR RECEIPT OF ANY THIRD PARTY SERVICES OR THIRD PARTY CONTENT OR IN
        CONNECTION WITH YOUR SUBMISSIONS), OR UNAUTHORIZED INTERCEPTION OF ANY
        SUCH INFORMATION BY THIRD PARTIES, EVEN IF ADVISED IN ADVANCE OF SUCH
        DAMAGES OR LOSSES. FURTHER, WE, NEIL, OUR AFFILIATES AND OUR RESPECTIVE
        REPRESENTATIVES WILL NOT BE LIABLE FOR DAMAGES OF ANY KIND RESULTING
        FROM YOUR USE OF OR INABILITY TO USE THE NYA SERVICE OR FROM ANY THIRD
        PARTY SERVICES, THIRD PARTY CONTENT, INFORMATION OR MATERIALS ON THE NYA
        SERVICE, INCLUDING FROM ANY VIRUS THAT MAY BE TRANSMITTED IN CONNECTION
        THEREWITH. YOUR SOLE AND EXCLUSIVE REMEDY FOR DISSATISFACTION WITH THE
        NYA SERVICE IS TO STOP USING THE NYA SERVICE. OUR MAXIMUM LIABILITY FOR
        ALL DAMAGES, LOSSES AND CAUSES OF ACTION, WHETHER IN CONTRACT, TORT
        (INCLUDING, WITHOUT LIMITATION, NEGLIGENCE) OR OTHERWISE SHALL BE THE
        GREATER OF (A)&nbsp;THE TOTAL AMOUNT PAID BY YOU TO US TO ACCESS AND USE
        THE NYA SERVICE AND (B)&nbsp;TEN DOLLARS&nbsp;($10.00).
      </p>
      <p>
        IT IS POSSIBLE THAT APPLICABLE LAW MAY NOT ALLOW FOR LIMITATIONS ON
        CERTAIN IMPLIED WARRANTIES OR EXCLUSIONS OR LIMITATIONS OF CERTAIN
        DAMAGES; SOLELY TO THE EXTENT THAT SUCH LAW APPLIES TO YOU, SOME OR ALL
        OF THE ABOVE DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO
        YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS. IF YOU ARE A CONSUMER RESIDING
        IN NEW JERSEY, PLEASE SEE THE IMPORTANT NOTE IN SECTION 27 BELOW.
      </p>
      <p>
        While we try to maintain the timeliness, integrity and security of the
        NYA Service, we do not guarantee that the NYA Service or any Third Party
        Services is or will be updated, complete, correct or secure or that any
        use of the NYA Service or any Third Party Services will be
        uninterrupted. The NYA Service or any Third Party Services may include
        inaccuracies, errors and materials that violate or conflict with this
        Agreement. Additionally, third parties may make unauthorized alterations
        to the NYA Service or any Third Party Services. If you become aware of
        any such unauthorized third party alterations to the NYA Service,
        contact us at&nbsp;help@mail.neilyoungarchives.com&nbsp;with a
        description of the material(s) at issue and the URL or location of such
        materials.&nbsp;
      </p>
      <ol start="22">
        <li>
          <strong> Indemnity</strong>. Except to the extent prohibited under
          applicable law, you agree to defend, indemnify and hold harmless us,
          Neil, our Affiliates and our and their respective Representatives,
          from and against all claims, liabilities, damages, judgments, awards,
          losses, costs, fees and expenses (including attorneys&rsquo; fees)
          arising out of (a)&nbsp;your use of, or activities in connection with,
          the NYA Service (including all Submissions); (b)&nbsp;any violation or
          alleged violation of this Agreement by you; (c)&nbsp;any use or other
          exploitation, or failure or omission to use or otherwise exploit, any
          Submission (including any portion thereof) that you post or make
          available; or (d)&nbsp;any claim that your Submission or any use or
          exploitation thereof caused damage to or infringed upon or violated
          the rights of a third party, including without limitation past,
          present or future infringement, misappropriation, libel, defamation,
          invasion of privacy or right of publicity or violation of rights
          related to the foregoing.
        </li>
      </ol>
      <ol start="23">
        <li>
          <strong> Termination</strong>. This Agreement is effective until
          terminated. We may, at any time and for any or no reason (including if
          we believe you have violated or acted inconsistently with the letter
          or spirit of this Agreement), terminate or suspend your access to or
          use of: (a)&nbsp;the NYA Service, (b)&nbsp;your user name and password
          or (c)&nbsp;any files or information associated with your user name
          and password. If we terminate or suspend your access to or use of the
          NYA Service, you will not have the right to bring claims against us,
          Neil, our Affiliates or our or their respective Representatives with
          respect to such termination or suspension. We, Neil, and our
          Affiliates and our and their respective Representatives, shall not be
          liable for any termination or suspension of your access to the NYA
          Service or to any such information or files, and shall not be required
          to make such information or files available to you after any such
          termination or suspension. We may take steps that we believe are
          appropriate to enforce or verify compliance with any part of this
          Agreement (including our right to cooperate with any legal process
          relating to your use of the NYA Service, any Products or Services or
          any third party claim that your use of the NYA Service or Products or
          Services is unlawful or infringes such third party's rights). Sections
          2, 6-8, 17-25, 27-29, 30 and 31 shall survive any expiration or
          termination of this Agreement.
        </li>
      </ol>
      <ol start="24">
        <li>
          <strong> Governing Law; Dispute Resolution</strong>. You hereby agree
          that this Agreement (and any claim or dispute arising in connection
          with this Agreement or your use of the NYA Service) is governed by and
          shall be construed in accordance with the laws of the United States
          (including federal arbitration law) and the State of New York, U.S.A.,
          without regard to its principles of conflicts of law or the U.N.
          Convention of Contracts for International Sale of Goods, and
          regardless of your location. Except for disputes that qualify for
          small claims court, all disputes arising out of or related to this
          Agreement or any aspect of the relationship between you and us,
          whether based in contract, tort, statute, fraud, misrepresentation or
          any other legal theory, will be resolved through final and binding
          arbitration before a neutral arbitrator instead of in a court by a
          judge or jury and you agree that each of you and us are waiving the
          right to trial by a jury. Except as provided below regarding the class
          action waiver, such disputes include, without limitation, disputes
          arising out of or relating to interpretation or application of this
          arbitration provision, including the enforceability, revocability or
          validity of the arbitration provision or any portion of the
          arbitration provision. All such matters shall be decided by an
          arbitrator and not by a court or judge. However, as set forth below,
          the preceding arbitration requirement shall not apply to disputes
          solely to the extent relating to the interpretation or application of
          the class action waiver below, including its enforceability,
          revocability or validity.
        </li>
      </ol>
      <p>
        You agree that any arbitration under this Agreement will take place on
        an individual basis; class arbitrations and class actions are not
        permitted and you are agreeing to give up the ability to participate in
        a class action.&nbsp;Notwithstanding anything to the contrary in this
        Section or any other provision of this Agreement or in the American
        Arbitration Association&rsquo;s Consumer Arbitration Rules, disputes
        regarding the enforceability, revocability or validity of the foregoing
        class action waiver may be resolved only by a civil court of competent
        jurisdiction and not by an arbitrator. In any case in which (1) the
        dispute is filed as a class, collective, or representative action, and
        (2) there is a final judicial determination that all or part of such
        class action waiver is unenforceable, then the class, collective, and/or
        representative action, to that extent, must be litigated in a civil
        court of competent jurisdiction, but the portion of such class action
        waiver that is enforceable shall be enforced in arbitration.
      </p>
      <p>
        The arbitration will be administered by the American Arbitration
        Association under its Consumer Arbitration Rules, as amended by this
        Agreement. The Consumer Arbitration Rules are available online
        at&nbsp;https://www.adr.org/sites/default/files/Consumer%20Rules.pdf.
        The arbitrator will conduct hearings, if any, by teleconference or
        videoconference, rather than by personal appearances, unless the
        arbitrator determines upon request by you or by us that an in-person
        hearing is appropriate. Any in-person appearances will be held at a
        location which is reasonably convenient to both parties with due
        consideration of their ability to travel and other pertinent
        circumstances. If the parties are unable to agree on a location, such
        determination should be made by the AAA or by the arbitrator. The
        arbitrator&rsquo;s decision will follow the terms of this Agreement and
        will be final and binding. The arbitrator will have authority to award
        temporary, interim or permanent injunctive relief or relief providing
        for specific performance of this Agreement, but only to the extent
        necessary to provide relief warranted by the individual claim before the
        arbitrator. The award rendered by the arbitrator may be confirmed and
        enforced in any court having jurisdiction thereof. Notwithstanding any
        of the foregoing, nothing in this Agreement will preclude you from
        bringing issues to the attention of federal, state or local agencies
        and, if the law allows, they can seek relief against us for you.
      </p>
      <p>
        Notwithstanding the foregoing, you agree that any unauthorized use of
        the NYA Service, Products or any related software or materials, or any
        Third Party Services, would result in irreparable injury to us, Neil,
        our Affiliates or our or their respective Representatives for which
        money damages would be inadequate, and in such event we, Neil, our
        Affiliates or our or their respective Representatives, as applicable,
        shall have the right, in addition to other remedies available at law and
        in equity, to immediate injunctive relief against you. Nothing contained
        in this section or elsewhere in this Agreement shall be construed to
        limit remedies or relief available pursuant to statutory or other claims
        that we, Neil, our Affiliates or our or their respective Representatives
        may have under separate legal authority, including, without limitation,
        any claim for intellectual property infringement.
      </p>
      <ol start="25">
        <li>
          <strong> Filtering</strong>. Pursuant to 47 U.S.C. Section 230(d) as
          amended, we hereby notify you that parental control protections are
          commercially available that may assist you in limiting access to
          material that is harmful to minors. Information identifying current
          providers of such protections is available from
          https://en.wikipedia.org/wiki/Comparison_of_content-control_software_and_providers.Please
          note that we do not endorse any products or services listed at this
          site.
        </li>
      </ol>
      <ol start="26">
        <li>
          <strong> Information or Complaints</strong>. Under California Civil
          Code Section 1789.3, California users are entitled to the following
          consumer rights notice: If you have a question or complaint regarding
          the NYA Service, please feel free to contact us via e-mail at
          help@mail.neilyoungarchives.com. E-mail communications are not
          necessarily secure, so please do not include credit card information
          or other sensitive information in any e-mail to us. You may also
          contact us by phone at (818) 953-2600 or by writing to us at Warner
          Bros. Records, 3300 Warner Blvd, Burbank, CA 91505. California
          residents may reach the Complaint Assistance Unit of the Division of
          Consumer Services of the California Department of Consumer Affairs by
          mail at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone
          at (916) 445 1254 or&nbsp;(800) 952-5210.
        </li>
      </ol>
      <ol start="27">
        <li>
          <strong> Important Note to New Jersey Consumers. </strong>If you are a
          consumer residing in New Jersey, the following provisions of this
          Agreement do not apply to you (and do not limit any rights that you
          may have) to the extent that they are unenforceable under New Jersey
          law: (a)&nbsp;in Section&nbsp;21 above, the disclaimer of liability
          for any indirect, incidental, consequential, special, exemplary or
          punitive damages of any kind (for example, to the extent unenforceable
          under the New Jersey Punitive Damages Act, New Jersey Products
          Liability Act, New Jersey Uniform Commercial Code and New Jersey
          Consumer Fraud Act); (b)&nbsp;in Section&nbsp;21 above, the limitation
          of liability for lost profits or loss or misuse of any data (for
          example, to the extent unenforceable under the New Jersey Identity
          Theft Protection Act and New Jersey Consumer Fraud Act); (c)&nbsp;in
          Section&nbsp;21 above, application of the limitations of liability to
          the recovery of damages that arise under contract and tort, including
          negligence, strict liability or any other theory (for example, to the
          extent such damages are recoverable by a consumer under New Jersey
          law, including the New Jersey Products Liability Act); (d)&nbsp;in
          Section&nbsp;22 above, the requirement that you indemnify us (for
          example, to the extent the scope of such indemnity is prohibited under
          New Jersey law); and (e)&nbsp;in Section&nbsp;24 above, the New York
          governing law provision (for example, to the extent that your rights
          as a consumer residing in New Jersey are required to be governed by
          New Jersey law).
        </li>
      </ol>
      <ol start="28">
        <li>
          <strong> Claims of Copyright Infringement</strong>. The Digital
          Millennium Copyright Act of 1998 (the &ldquo;<strong>DMCA</strong>
          &rdquo;) provides recourse for copyright owners who believe that
          material appearing on the Internet infringes their rights under U.S.
          copyright law. If you believe in good faith that materials available
          on the NYA Service infringe your copyright, you (or your agent) may
          send us a notice requesting that we remove the material or disable
          access to it. If you believe in good faith that someone has wrongly
          filed a notice of copyright infringement against you, the DMCA permits
          you to send us a counter-notice. Notices and counter-notices must meet
          the then-current statutory requirements imposed by the DMCA. See&nbsp;
          <strong>http://www.copyright.gov</strong>for details. Notices and
          counter-notices should be sent to:
        </li>
      </ol>
      <p>
        <strong>DMCA Agent-Litigation Department</strong>
      </p>
      <p>
        <strong>1633 Broadway</strong>
      </p>
      <p>
        <strong>New York, NY 10019</strong>
      </p>
      <p>
        <strong>Telephone Number: (212) 275-2000</strong>
      </p>
      <p>
        <strong>Email: dmcaagent@wmg.com</strong>
      </p>
      <p>
        We suggest that you consult your legal advisor before filing a notice or
        counter-notice.
      </p>
      <ol start="29">
        <li>
          <strong> Ability to Enter Into This Agreement</strong>. By using the
          NYA Service, you affirm that you are of legal age to enter into this
          Agreement or, if you are not, that you have obtained parental or
          guardian consent to enter into this Agreement.&nbsp;
        </li>
      </ol>
      <ol start="30">
        <li>
          <strong> Export Controls</strong>. You are responsible for complying
          with United States export controls and for any violation of such
          controls, including any United States embargoes or other federal rules
          and regulations restricting exports. You represent, warrant and
          covenant that you are not (a)&nbsp;located in, or a resident or a
          national of, any country subject to a U.S. government embargo or other
          restriction, or that has been designated by the U.S. government as a
          &ldquo;terrorist supporting&rdquo; country; or (b)&nbsp;on any of the
          U.S. government lists of restricted end users.
        </li>
      </ol>
      <ol start="31">
        <li>
          <strong> Miscellaneous</strong>. This Agreement does not, and shall
          not be construed to, create any partnership, joint venture,
          employer-employee, agency or franchisor-franchisee relationship
          between you and us. If any provision of this Agreement is found to be
          unenforceable, that provision will not affect the validity and
          enforceability of any other provision. You may not assign, transfer or
          sublicense any or all of your rights or obligations under this
          Agreement without our express prior written consent. We may assign,
          transfer or sublicense any or all of our rights or obligations under
          this Agreement without restriction. No waiver by either party of any
          breach or default hereunder will be deemed to be a waiver of any
          preceding or subsequent breach or default. This Agreement hereby
          incorporates by this reference any additional terms that we post on
          the NYA Service (including, without limitation, our Privacy Policy)
          and, except as otherwise expressly stated herein, this Agreement is
          the entire Agreement between you and us relating to the subject matter
          herein and supersedes any and all prior or contemporaneous written or
          oral agreements or understandings between you and us relating to such
          subject matter. Any heading, caption or section title contained herein
          is for convenience only, and in no way defined or explains any section
          or provision. All terms defined in the singular shall have the same
          meanings when used in the plural, where appropriate and unless
          otherwise specified. Any use of the term &ldquo;including&rdquo; or
          variation thereof in this Agreement shall be construed as if followed
          by the phrase &ldquo;without limitation.&rdquo; Notices to you
          (including notices of changes to this Agreement)&nbsp;may be made via
          posting to the NYA Service, by e-mail or by regular mail, in our
          discretion. We may also provide notice of changes to this Agreement or
          other matters by displaying such notices or by providing links to such
          notices. You agree that a printed version of this Agreement and of any
          notice given in electronic form shall be admissible in judicial or
          administrative proceedings based upon or relating to this Agreement to
          the same extent and subject to the same conditions as other business
          documents and records originally generated and maintained in printed
          form. We will not be responsible for failure to fulfill any obligation
          due to causes beyond our control. Except as expressly set forth in the
          following sentence, nothing in this Agreement, express or implied, is
          intended to confer, nor shall anything herein confer on, any person
          other than the parties and the respective successors or permitted
          assigns of the parties, any rights, remedies, obligations or
          liabilities. Notwithstanding the previous sentence, you agree that
          Neil, our Affiliates and our and their respective Representatives who
          are content owners and service providers from whom we have obtained a
          license or other rights to use their content and services, as
          applicable, in connection with the NYA Service) are third-party
          beneficiaries under this Agreement with the right to enforce the
          provisions of this Agreement that directly apply to such parties.
          Notwithstanding the immediately preceding sentence, our right to enter
          into, rescind or terminate any variation, waiver or settlement under
          this Agreement is not subject to the consent of any third party.
        </li>
      </ol>
      <ol start="32">
        <li>
          <strong>Terms Applicable for Apple iOS</strong>.
        </li>
      </ol>
      <p>
        If you are accessing or using the Service through a mobile phone, tablet
        or other device provided by Apple Inc. (&ldquo;<strong>Apple</strong>
        &rdquo;) and running on Apple&rsquo;s iOS (an &ldquo;
        <strong>Apple Device</strong>&rdquo;), the following additional terms
        and conditions are applicable to you and are incorporated into the Terms
        by this reference:
      </p>
      <p>
        (i)To the extent that you are accessing the Service through an Apple
        Device, you acknowledge that this Agreement are entered into between you
        and NYA and that Apple is not a party to this Agreement other than as
        third-party beneficiary as contemplated below.
      </p>
      <p>
        (ii)The license granted to you in this Agreement is subject to the
        permitted Usage Rules set forth in the App Store Terms of Service (see:
        http://www.apple.com/legal/itunes/us/terms.html) and any third party
        terms of agreement applicable to the Service.
      </p>
      <p>
        (iii)You acknowledge that NYA, and not Apple, is responsible for
        providing the Service and content thereof.
      </p>
      <p>
        (iv)You acknowledge that Apple has no obligation whatsoever to furnish
        any maintenance or any support services to you with respect to the
        Service.
      </p>
      <p>
        (v)To the maximum extent permitted by applicable law, Apple will have no
        other warranty obligation whatsoever with respect to the Service.
      </p>
      <p>
        (vi)Notwithstanding anything to the contrary herein, and subject to the
        terms in this Agreement, you acknowledge that, solely as between Apple
        and NYA, NYA, and not Apple is responsible for addressing any claims you
        may have relating to the Service, or your possession and/or use thereof,
        including, but not limited, to: (i) product liability claims; (ii) any
        claim that the Service fails to confirm to any applicable legal or
        regulatory requirement; and (iii) claims arising under consumer
        protection or similar legislation.
      </p>
      <p>
        (vii)Further, you agree that if the Service, or your possession and use
        of the Service, infringes on a third party's intellectual property
        rights, you will not hold Apple responsible for the investigation,
        defense, settlement and discharge of any such intellectual property
        infringement claims.
      </p>
      <p>
        (viii)You acknowledge and agree that Apple, and Apple&rsquo;s
        subsidiaries, are third-party beneficiaries of this Agreement, and that,
        upon your acceptance of the terms and conditions of this Agreement,
        Apple will have the right (and will be deemed to have accepted the
        right) to enforce this Agreement against you as a third-party
        beneficiary thereof.
      </p>
      <p>
        (ix)When using the Service, you agree to comply with any and all
        third-party terms that are applicable to any platform, website,
        technology or service that interacts with the Service.
      </p>
      <p>
        <br />
        <br />
      </p>
      <p>
        All materials &copy; 2018 Warner Bros. Records, a Warner Music Group
        Company, &copy; 2018&nbsp;Shakey&nbsp;Pictures, Inc., &copy; 2017 Silver
        Bow Productions, Inc., or &copy; 2018 Other Shoe Productions, Inc., as
        applicable, unless otherwise noted. All rights reserved.
      </p>
    </div>
  );
};

export default Terms;
