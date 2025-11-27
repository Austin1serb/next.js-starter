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

export const Privacy: React.FC<PrivacyProps> = ({ accentColor, fullCompanyName, fullWebAddress, contact }) => {
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
            className="-z-1 mr-2 rounded-full font-bold text-blue-600 opacity-15"
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
          Privacy Policy
        </h1>
        <p className="py-5">
          <em className="border-l-4 border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 italic dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            Last updated: Jul 12, 2025 12:00 PM
          </em>
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <p className="py-5">
          We value your privacy very highly. Please read this Privacy Policy carefully before using the{" "}
          <a href={fullWebAddress} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {fullWebAddress}
          </a>{" "}
          Website (the &quot; <strong className="font-bold text-black"> Website</strong>&quot;) operated by{" "}
          <strong className="font-bold text-black"> {fullCompanyName}</strong>, a Corporation formed in {SITE_NAP.state}, United States (
          <strong className="font-bold text-black"> us</strong>,&quot; &quot;
          <strong className="font-bold text-black"> we</strong>,&quot; &quot;
          <strong className="font-bold text-black"> our</strong>&quot;) as this Privacy Policy contains important information regarding your privacy and how we
          may use the information we collect about you.
        </p>
        <p className="py-5">
          Your access to and use of the Website is conditional upon your acceptance of and compliance with this Privacy Policy. This Privacy Policy applies to
          everyone, including, but not limited to: visitors, users, and others who wish to access or use the Website.
        </p>
        <p className="py-5">
          By accessing or using the Website, you agree to be bound by this Privacy Policy. If you disagree with any part of the Privacy Policy, then you do not
          have our permission to access or use the Website.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2
          className="md py-2.5 text-base leading-relaxed font-bold text-blue-600"
          id="what-information-we-collect-where-we-get-this-information-how-we-use-this-information-what-happens-if-we-don-t-have-it-and-the-legal-basis-for-processing-this-information"
          style={{ scrollMarginTop: "100px" }}
        >
          What information we collect, where we get this information, how we use this information, what happens if we don&apos;t have it, and the legal basis
          for processing this information
        </h2>
        <p className="py-5">We collect any and all information that you enter on this Website. We collect the following information about you:</p>
        <h3 className="relative flex items-center py-2.5 italic sm:py-5">
          {" "}
          <span
            className="-z-1 mr-2 rounded-full font-bold text-blue-600 opacity-15"
            style={{
              background: `var(${accentColor}, )`,
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-6px",
            }}
          ></span>
          Name
        </h3>
        <p className="py-5">
          <strong className="font-bold text-black"> Specific piece of information</strong>: Name
          <br />
          <strong className="font-bold text-black"> Legal basis for processing this information</strong>:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Processing is necessary in order to take steps that the user has requested prior to entering into a contract.
              <strong className="font-bold text-black"> Where we get this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Information submitted by the consumer.
              <strong className="font-bold text-black"> How we use this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Performing services</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Providing customer service</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Verifying customer information
              <strong className="font-bold text-black"> What happens if we don&apos;t have this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for performing services will not be possible</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for providing customer service will not be possible</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for verifying customer information will not be possible</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h3 className="relative flex items-center py-2.5 italic sm:py-5">
          {" "}
          <span
            className="-z-1 mr-2 rounded-full font-bold text-blue-600 opacity-15"
            style={{
              background: `var(${accentColor}, )`,
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-6px",
            }}
          ></span>
          Phone number
        </h3>
        <p className="py-5">
          <strong className="font-bold text-black"> Specific piece of information</strong>: Phone number
          <br />
          <strong className="font-bold text-black"> Legal basis for processing this information</strong>:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Processing is necessary in order to take steps that the user has requested prior to entering into a contract.
              <strong className="font-bold text-black"> Where we get this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Information submitted by the consumer.
              <strong className="font-bold text-black"> How we use this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Performing services</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Providing customer service</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Verifying customer information
              <strong className="font-bold text-black"> What happens if we don&apos;t have this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for performing services will not be possible</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for providing customer service will not be possible</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for verifying customer information will not be possible</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h3 className="relative flex items-center py-2.5 italic sm:py-5">
          {" "}
          <span
            className="-z-1 mr-2 rounded-full font-bold text-blue-600 opacity-15"
            style={{
              background: `var(${accentColor}, )`,
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-6px",
            }}
          ></span>
          IP address
        </h3>
        <p className="py-5">
          <strong className="font-bold text-black"> Specific piece of information</strong>: IP address
          <br />
          <strong className="font-bold text-black"> Legal basis for processing this information</strong>:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Processing is necessary for compliance with a legal obligation.
              <strong className="font-bold text-black"> Where we get this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Tracking pixels</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              The observation and recording of activities by the business, such as through the use of cookies
              <strong className="font-bold text-black"> How we use this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Analytics
              <strong className="font-bold text-black"> What happens if we don&apos;t have this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for analytics will not be possible</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h3 className="relative flex items-center py-2.5 italic sm:py-5">
          {" "}
          <span
            className="-z-1 mr-2 rounded-full font-bold text-blue-600 opacity-15"
            style={{
              background: `var(${accentColor})`,
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-6px",
            }}
          ></span>
          Email address
        </h3>
        <p className="py-5">
          <strong className="font-bold text-black"> Specific piece of information</strong>: Email address
          <br />
          <strong className="font-bold text-black"> Legal basis for processing this information</strong>:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Processing is necessary to perform a contract with the user</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Processing is necessary in order to take steps that the user has requested prior to entering into a contract
              <strong className="font-bold text-black"> Where we get this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Information submitted by the consumer.
              <strong className="font-bold text-black"> How we use this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Performing services</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Providing customer service</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Verifying customer information
              <strong className="font-bold text-black"> What happens if we don&apos;t have this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for performing services will not be possible</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for providing customer service will not be possible</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for verifying customer information will not be possible</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h3 className="relative flex items-center py-2.5 italic sm:py-5">
          {" "}
          <span
            className="-z-1 mr-2 rounded-full font-bold text-blue-600 opacity-15"
            style={{
              background: `var(${accentColor})`,
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-6px",
            }}
          ></span>
          Device identifier
        </h3>
        <p className="py-5">
          <strong className="font-bold text-black"> Specific piece of information</strong>: Device identifier
          <br />
          <strong className="font-bold text-black"> Legal basis for processing this information</strong>:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Processing is necessary for compliance with a legal obligation.
              <strong className="font-bold text-black"> Where we get this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Tracking pixels</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              The observation and recording of activities by the business, such as through the use of cookies
              <strong className="font-bold text-black"> How we use this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              Analytics
              <strong className="font-bold text-black"> What happens if we don&apos;t have this information</strong>:
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Our use of your data for analytics will not be possible</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="with-whom-we-share-your-personal-information" style={{ scrollMarginTop: "100px" }}>
          With whom we share your personal information
        </h2>
        <p className="py-5">We do not share your personal information with any third parties.</p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="how-we-protect-your-information" style={{ scrollMarginTop: "100px" }}>
          How we protect your information
        </h2>
        <p className="py-5">We have implemented the following measures to protect and safeguard your personal information:</p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Limiting the amount of personal information that we collect to strictly necessary only</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Using SSL or other secure connection technologies when receiving or sending personal information beyond internal networks</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Destroying the personal information that we no longer need</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Having comprehensive security policies and procedures</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Training our employees</span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="sale-of-your-information" style={{ scrollMarginTop: "100px" }}>
          Sale of your information
        </h2>
        <p className="py-5">We do not sell your personal information.</p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="cookies" style={{ scrollMarginTop: "100px" }}>
          Cookies
        </h2>
        <p className="py-5">
          A cookie is a small piece of data sent from a website and stored on your device by your browser. This Website collects cookies and may use cookies for
          reasons including, but not limited to:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Analyzing our Website traffic</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Analyzing your interactions with advertisements</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Identifying if you are signed in to the Website</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Testing content on the Website</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Storing information about your preferences</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Recognizing when you return to the Website</span>
          </li>
        </ol>
        <p className="py-5">
          Most web browsers automatically accept cookies. However, you can modify your browser settings to decline cookies, if you prefer. This setting may
          prevent you from taking full advantage of the Website.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="children-s-privacy" style={{ scrollMarginTop: "100px" }}>
          Children&apos;s privacy
        </h2>
        <p className="py-5">
          This Website is intended for use by a general audience and does not offer services to children. Should a child whom we know to be under 18 send
          personal information to us, we will use that information only to respond to that child to inform him or her that they cannot use this Website.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="analytics-programs" style={{ scrollMarginTop: "100px" }}>
          Analytics programs
        </h2>
        <p className="py-5">
          This Website uses Google Analytics to collect information about you and your behaviors. If you would like to opt out of Google Analytics, please visit{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline duration-300 hover:text-blue-600"
          >
            https://tools.google.com/dlpage/gaoptout/
          </a>
          .
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="information-retention" style={{ scrollMarginTop: "100px" }}>
          Information retention
        </h2>
        <p className="py-5">We retain all of the information that we collect until we no longer need it</p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="direct-marketing" style={{ scrollMarginTop: "100px" }}>
          Direct marketing
        </h2>
        <p className="py-5">
          We use the information that we collect about you for direct marketing purposes. Direct marketing is the act of selling products or services directly
          to consumers rather than through retailers. Residents of the European Union and/or the European Economic Area and the United Kingdom - You may, at any
          time, request that we cease to use your information for direct marketing purposes by emailing us at{" "}
          <strong className="font-bold text-black">
            <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
              {contact.email}
            </a>
          </strong>
          .
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="your-rights" style={{ scrollMarginTop: "100px" }}>
          Your Rights
        </h2>
        <p className="py-5">Depending upon where you reside, you may have the following rights with regard to your personal information:</p>
        <ol className="list-inside list-decimal space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to access the personal information that we have collected about you.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of Canada, the European Union and/or the European Economic Area, the
                United Kingdom, and Quebec only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to say no to the sale of your personal information.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of Nevada only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to request that we delete all or some of the personal information that we have collected on you.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of the European Union and/or the European Economic Area and the United
                Kingdom only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to ask us to transmit your personal information that we have collected on you to another provider (where technically feasible).
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of the European Union and/or the European Economic Area and the United
                Kingdom only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to request that we amend any of the information that we have collected about you.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of Canada, the European Union and/or the European Economic Area, the
                United Kingdom, and Quebec only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to withdraw your consent to the processing of your data.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of Canada, the European Union and/or the European Economic Area, the
                United Kingdom, and Quebec only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to request that we restrict the processing of your data.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of the European Union and/or the European Economic Area and the United
                Kingdom only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to lodge a complaint regarding our collection, sharing, and processing of data with competent authorities in the proper jurisdiction.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of Canada, the European Union and/or the European Economic Area, the
                United Kingdom, and Quebec only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to stop receiving unwanted direct marketing.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of the European Union and/or the European Economic Area only
              </p>
            </span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>
              <p className="py-5">
                The right to receive the personal information that we hold about you in a portable and, to the extent feasible, a readily usable format that
                allows you to transmit this information to another entity.
                <br />
                <strong className="font-bold text-black"> Applies To</strong>: Residents of the European Union and/or the European Economic Area and the United
                Kingdom only
              </p>
            </span>
          </li>
        </ol>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="exercising-your-rights" style={{ scrollMarginTop: "100px" }}>
          Exercising your rights
        </h2>
        <p className="py-5">You may exercise the rights specified above by submitting a consumer request to:</p>
        <p className="py-5">
          <strong className="font-bold text-black"> {contact.name}</strong>
          <br />
          {contact.title}
          <br />
          {contact.phone}
          <br />
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
          <br />

          <a href={fullWebAddress} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {fullWebAddress}
          </a>
        </p>
        <p className="py-5">
          We will need to verify your identity prior to effectuating your request. To verify your identity, you will need to provide us with the following
          information with your request:
        </p>
        <ol className="space-y-2.5">
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Name</span>
          </li>
          <li className="flex items-center">
            <svg height="25" width="25" className="mr-2 p-1">
              <use href="#list-arrow-right" />
            </svg>
            <span>Email address</span>
          </li>
        </ol>
        <p className="py-5">Please note that we may be unable to process your request if you do not provide us with the above information.</p>
        <p className="py-5">
          We will respond to most consumer requests within 30 to 45 days of receipt, depending upon where you reside. However, some requests may take longer. We
          will notify you in writing if we need more time to respond. We have the ability to deny your request(s) if certain exceptions in the law apply. If we
          do deny your request, we will provide you with the reasons for such denial.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="accountability" style={{ scrollMarginTop: "100px" }}>
          Accountability
        </h2>
        <p className="py-5">The following person(s) is accountable and responsible for our privacy practices and procedures:</p>
        <p className="py-5">
          <strong className="font-bold text-black"> {contact.name}</strong>
          <br />
          {contact.title}
          <br />
          {contact.phone}
          <br />
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="location-of-data-processing" style={{ scrollMarginTop: "100px" }}>
          Location of data processing
        </h2>
        <p className="py-5">All data processing activities undertaken by us take place in the United States.</p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="data-protection-officer" style={{ scrollMarginTop: "100px" }}>
          Data Protection Officer
        </h2>
        <p className="py-5">
          <strong className="font-bold text-black"> {contact.name}</strong>
          {contact?.name?.includes("&") ? " are" : " is"} our Data Protection Officer and may be reached via email at{" "}
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
          .
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="third-party-websites" style={{ scrollMarginTop: "100px" }}>
          Third-party websites
        </h2>
        <p className="py-5">
          This Website may contain hyperlinks to websites operated by parties other than us. We provide such hyperlinks for your reference only. We do not
          control such websites and are not responsible for their contents or the privacy or other practices of such websites. It is up to you to read and fully
          understand their Privacy Policies. Our inclusion of hyperlinks to such websites does not imply any endorsement of the material on such websites or any
          association with their operators.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="do-not-track" style={{ scrollMarginTop: "100px" }}>
          Do Not Track
        </h2>
        <p className="py-5">
          Do Not Track (<strong className="font-bold text-black"> DNT</strong>) is a preference you can set on your browser to inform websites that you do not
          want to be tracked. We do not support Do Not Track. You can enable or disable Do Not Track by visiting the Preferences or Settings page of your
          browser.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="changes-to-privacy-policy" style={{ scrollMarginTop: "100px" }}>
          Changes to Privacy Policy
        </h2>
        <p className="py-5">
          We reserve the right to amend this Privacy Policy at any time. We will notify you of any changes to this Privacy Policy by posting the updated Privacy
          Policy to this website or application.
        </p>
        <hr className="mt-5 mb-5 border-gray-300" />
        <h2 className="py-2.5 leading-relaxed font-bold text-blue-600" id="questions" style={{ scrollMarginTop: "100px" }}>
          Questions
        </h2>
        <p className="py-5">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-black underline duration-300 hover:text-blue-600">
            {contact.email}
          </a>
          .
        </p>
      </div>
    </main>
  )
}
