import { SITE_NAP } from "@/config/site-config"

interface PrivacyProps {
  accentColor: string
  fullCompanyName: string
  fullWebAddress: string
  contact: {
    name: string
    title: string
    phone: string
    email: string
  }
}
const year = new Date().getFullYear()

export const Terms: React.FC<PrivacyProps> = ({ accentColor, fullCompanyName, fullWebAddress, contact }) => {
  return (
    <main className="relative mx-auto mt-20 bg-white px-10 py-20 text-black md:px-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", maxWidth: 0, maxHeight: 0, overflow: "hidden", display: "hidden" }}
        aria-hidden="true"
      >
        <symbol id="list-arrow-right" viewBox="0 0 448 512">
          <path
            fill="#979797a5"
            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
          ></path>
        </symbol>
      </svg>
      <div className="relative z-1 mx-auto max-w-7xl text-base">
        <h1 className="relative mt-2.5 mb-2.5 text-2xl font-bold text-blue-600">
          <span
            className={`absolute top-[-10px] left-[-25px] -z-1 mr-2 flex h-10 w-10 items-center justify-center rounded-full font-bold opacity-15`}
            style={{
              background: `var(${accentColor})`,
            }}
          ></span>
          <span
            className="-z-1 mr-2 rounded-full text-sm font-bold text-blue-600 opacity-15"
            style={{
              background: `var(${accentColor}, )`,
              height: "40px",
              width: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "0px",
              left: "-15px",
            }}
          ></span>
          Terms of Service
        </h1>
        <p className="py-5">
          <em className="border-l-4 border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 italic dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            Last updated: Jul 12, 2025 12:00 PM
          </em>
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <p className="py-5">
          Please read these Terms of Service (&quot;<strong className="font-bold text-black">Terms</strong>,&quot; &quot;
          <strong className="font-bold text-black">Terms of Service</strong>&quot;) carefully before using the{" "}
          <a href={`${fullWebAddress}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {fullWebAddress}
          </a>{" "}
          website (the &quot;<strong className="font-bold text-black">Website</strong>&quot;) operated by{" "}
          <strong className="font-bold text-black">{fullCompanyName}</strong> (&quot;
          <strong className="font-bold text-black">we</strong>,&quot; &quot;
          <strong className="font-bold text-black">us</strong>
          ,&quot; &quot;<strong className="font-bold text-black">our</strong>&quot;). These Terms outline the rules and regulations for accessing and using the
          Website. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree
          with any part of these Terms, you must not access or use the Website. These Terms apply to all visitors, users, and others who interact with the
          Website.
        </p>
        <p className="py-5">
          By accessing or using the Website, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you do not have our
          permission to access or use the Website.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="prohibited-uses" style={{ scrollMarginTop: "100px" }}>
          Prohibited Uses
        </h2>
        <p className="py-5">
          You agree that you will use this Website in accordance with all applicable laws, rules, regulations, and these Terms at all times. The following is a
          non-exhaustive list of prohibited uses of this Website. You agree that you will <strong className="font-bold text-black">not</strong> perform any of
          the following prohibited uses:
        </p>

        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Impersonating or misrepresenting your affiliation with {fullCompanyName}, its team, or its services.</span>
          </li>

          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Sending unauthorized advertising or promotional material, including spam, chain emails, or similar content.</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Engaging in behavior that harms or disrupts the use or enjoyment of the Website for others.</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Using the Website to transmit harmful content, including viruses, worms, or malware.</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Attempting to gain unauthorized access to our systems or those of third parties connected to our Website.</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Using automated tools (e.g., robots, spiders) to scrape or monitor the Website without authorization.</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Violating any local, state, or federal laws in connection with your use of the Website.</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="no-warranty-on-website" style={{ scrollMarginTop: "100px" }}>
          No Warranty on Website
        </h2>
        <p className="py-5">
          The Website is provided &quot;as is&quot; and without any warranties, express or implied, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, or non-infringement. <strong className="font-bold text-black">{fullCompanyName}</strong> does not
          guarantee the Website will be error-free or available at all times.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="availability-errors-and-inaccuracies" style={{ scrollMarginTop: "100px" }}>
          Availability, Errors, and Inaccuracies
        </h2>
        <p className="py-5">
          We assume no liability for the availability, errors, or inaccuracies of the information, products, or services provided on this Website. We may
          experience delays in updating information on this Website and in our advertising on other websites. The information, products, and services found on
          the Website may contain errors or inaccuracies or may not be complete or current. Products or services may be incorrectly priced or unavailable. We
          expressly reserve the right to correct any pricing errors on our Website. The inclusion or offering of any product or service on this Website does not
          constitute an endorsement or recommendation of such product or service by us. In the event of an error in pricing or service descriptions, we reserve
          the right to cancel or modify any orders placed under incorrect terms. If we modify an order, we will attempt to contact you before proceeding.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="damages-and-limitation-of-liability" style={{ scrollMarginTop: "100px" }}>
          Damages and Limitation of Liability
        </h2>
        <p className="py-5">
          In no event shall <strong className="font-bold text-black">{fullCompanyName}</strong> be liable for any direct, indirect, punitive, incidental,
          special, or consequential damages arising out of, relating to, or in any way connected with your access to, display of, or use of this Website or with
          the delay or inability to access, display, or use this Website, including but not limited to your reliance upon opinions or information appearing on
          this Website; any computer viruses, information, software, linked websites operated by third parties, products, or services obtained through this
          Website, whether based on a theory of negligence, contract, tort, strict liability, consumer protection statutes, or otherwise, even if{" "}
          {fullCompanyName} has been advised of the possibility of such damages.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="links-to-third-party-websites" style={{ scrollMarginTop: "100px" }}>
          Links to Third-Party Websites
        </h2>
        <p className="py-5">
          This Website may contain hyperlinks to websites operated by third parties and not by us. We provide such hyperlinks for your reference only. We do not
          control such websites and are not responsible for their contents or the privacy or other practices of such websites. Further, it is your
          responsibility to take precautions to ensure that whatever links you click on or software that you download, whether from this Website or other
          websites or applications, is free of such items as viruses, worms, trojan horses, defects, and other items of a destructive nature. Our inclusion of
          hyperlinks to such websites does not imply any endorsement of the material on such websites or any association with their operators.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="intellectual-property-dmca-notice" style={{ scrollMarginTop: "100px" }}>
          Intellectual Property &amp; DMCA Notice
        </h2>
        <p className="py-5">
          All contents of this Website are ©2019 - {year} <strong className="font-bold text-black">{fullCompanyName}</strong> or third parties. All rights
          reserved. Unless specified otherwise, this Website and all content and other materials on this Website, including but not limited to all logos,
          designs, text, graphics, pictures, information, data, software, sound files, and arrangement thereof (collectively, &quot;
          <strong className="font-bold text-black">Content</strong>&quot;), are the proprietary property of {fullCompanyName} and are either registered
          trademarks, trademarks, or otherwise protected intellectual property of {fullCompanyName} or third parties in the United States and/or other
          countries.
        </p>
        <p className="py-5">
          If you are aware of a potential infringement of our intellectual property, please contact us at{" "}
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
          .
        </p>
        <p className="py-5">
          We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Website infringes on the
          copyright, trademark, or other intellectual property rights of any person or entity.
        </p>
        <p className="py-5">
          If you believe in good faith that the Content infringes on your intellectual property rights, you or your agent may send us a written notice of such
          infringement titled &quot;
          <strong className="font-bold text-black">Infringement of Intellectual Property Rights - DMCA</strong>.&quot; Your notice to us must include the
          following information:
        </p>
        <ol className="list-inside list-decimal space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>
              An electronic or physical signature of the person authorized to act on behalf of the owner of the intellectual property right&apos;s interest;
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>
              A description of the work that you claim has been infringed, including the URL (i.e., web page address) of the location where the work exists or a
              copy of the work;
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>Your name, email, address, and telephone number; and</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>

            <span>
              A statement by you that you have a good faith belief that the disputed use is not authorized by the owner of the work, its agent, or the law.
            </span>
          </li>
        </ol>
        <p className="py-5">
          Please note that we will not process your complaint if it is not properly filled out or is incomplete. You may be held accountable for damages,
          including but not limited to costs and attorneys&apos; fees for any misrepresentation or bad faith claims regarding the infringement of your
          intellectual property rights by the Content on this Website.
        </p>
        <p className="py-5">You may submit your claim to us by contacting us at:</p>
        <p className="py-5">
          <strong className="font-bold text-black">{fullCompanyName}</strong>
          <br />
          Attn: <strong className="font-bold text-black">{contact.email}</strong>
          <br />
          {contact.phone}
          <br />
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="indemnification" style={{ scrollMarginTop: "100px" }}>
          Indemnification
        </h2>
        <p className="py-5">
          You agree to defend, indemnify, and hold harmless <strong className="font-bold text-black">{fullCompanyName}</strong>, its affiliates, and their
          respective officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt,
          and expenses (including but not limited to attorneys&quot; fees) arising from:
          <br />
          (i) your use of and access to the Website;
          <br />
          (ii) your violation of any term of these Terms; or
          <br />
          (iii) your violation of any third party right, including without limitation any intellectual property, property, or privacy right.
        </p>
        <p className="py-5">This defense and indemnification obligation will survive these Terms and your use of the Website.</p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="governing-law-venue" style={{ scrollMarginTop: "100px" }}>
          Governing Law &amp; Venue
        </h2>
        <p className="py-5">
          These Terms shall be governed and construed in accordance with the laws of the state of {SITE_NAP.state}, United States, without regard to its
          conflict of laws provisions. These terms shall not be governed by the United Nations convention on contracts for the sale of international goods, the
          Uniform Commercial Code, nor Incoterms.
        </p>
        <p className="py-5">
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right or provision. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the
          entire agreement between you and us regarding our Website and supersede and replace any prior agreements we might have had with you regarding the
          Website.
        </p>
        <p className="py-5">
          Any controversy or claim arising out of or relating to these Terms (including but not limited to the interpretation or breach thereof) shall be
          resolved in a court of competent jurisdiction in King County, {SITE_NAP.state}.
        </p>
        <p className="py-5">
          You and {fullCompanyName} agree that each may bring claims against the other only in your or its individual capacity and not as a plaintiff or class
          member in any class or representative action.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="changes-to-terms-of-service" style={{ scrollMarginTop: "100px" }}>
          Changes to Terms of Service
        </h2>
        <p className="py-5">
          We reserve the right to make changes to these Terms of Service at any time. We will not provide you with any notice when we make changes to this Terms
          of Service.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="questions" style={{ scrollMarginTop: "100px" }}>
          Questions
        </h2>
        <p className="py-5">
          If you have any questions about our Terms of Service, please contact us at{" "}
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
          .
        </p>
      </div>
    </main>
  )
}
