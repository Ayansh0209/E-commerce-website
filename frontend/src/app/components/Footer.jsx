'use client'
import React, { useState } from 'react';

const Link = ({ href, children, className = '' }) => (
    <a href={href} className={className}>{children}</a>
);

/* ============================================================
   ICONS
============================================================ */

const FacebookIcon = ({ size = 5 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-${size} w-${size} hover:text-gray-300 cursor-pointer`}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M9 8H6v4h3v12h5V12h4l1-4h-5V6c0-.8.2-1 1-1h4V0h-4c-4 0-6 2-6 6v2z" />
    </svg>
);

const InstagramIcon = ({ size = 5 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-${size} w-${size} hover:text-gray-300 cursor-pointer`}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M7 2C4 2 2 4 2 7v10c0 3 2 5 5 5h10c3 0 5-2 5-5V7c0-3-2-5-5-5H7zm10 2c1 0 3 1 3 3v10c0 2-2 3-3 3H7c-1 0-3-1-3-3V7c0-2 2-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6-1a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
);

const TwitterIcon = ({ size = 5 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-${size} w-${size} hover:text-gray-300 cursor-pointer`}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M24 4.6a10 10 0 01-2.8.8 5 5 0 002.2-2.7 10 10 0 01-3.2 1.3A5 5 0 0016.7 3c-2.9 0-5.2 2.5-4.7 5.3A14 14 0 011.7 3s-4 9 5 13a11 11 0 01-6 2c9 5 20 0 20-11.5v-.5A7 7 0 0024 4.6z" />
    </svg>
);

const PinterestIcon = ({ size = 5 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-${size} w-${size} hover:text-gray-300 cursor-pointer`}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M12 0C5.4 0 0 5.3 0 12c0 5 3 9.3 7.6 11.1-.1-.8-.2-2 .1-2.9.2-.8 1.2-5 1.2-5s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1 0 1.5.7 1.5 1.7 0 1-.6 2.6-1 4-.3.9.4 1.6 1.4 1.6 1.6 0 3-1.8 3-4.3 0-2.9-2.1-4.9-5.1-4.9-3.5 0-5.5 2.5-5.5 5.3 0 1 .4 2.1.9 2.7.1.1.1.2.1.3-.1.4-.3.5-.8.3C3.4 17 2.7 14.8 2.7 13c0-4.1 3-7 8.5-7 4.5 0 7.8 3.3 7.8 7.4 0 4.6-2.6 8.2-6.5 8.2-1.3 0-2.5-.7-2.9-1.5l-.7 2.9c-.2.8-.9 1.7-1.3 2.2.9.2 1.8.4 2.9.4 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
);

/* ============================================================
   NEWSLETTER SECTION  (white + dotted background)
============================================================ */

const NewsletterSection = () => {
    return (
        <div
            className="
        w-full 
        py-14 
        px-4 
        bg-white
        
      "
        >
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">

                {/* Text */}
                <div className="mb-8 lg:mb-0">
                    <h1 className="text-3xl md:text-4xl font-bold text-black">
                        Subscribe Newsletter
                    </h1>
                    <p className="text-lg text-gray-700 mt-1">
                        & get latest Update of Company
                    </p>
                </div>

                {/* Email Field */}
                <form className="flex w-full lg:w-xl max-w-xl">
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        className="flex-grow p-4 border border-gray-300 rounded-l-md"
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-8 flex items-center justify-center rounded-r-md"
                    >
                        <span className="text-xl">—</span>
                    </button>
                </form>

            </div>
        </div>
    );
};

/* ============================================================
   FOOTER COLUMNS
============================================================ */

const FooterColumn = ({ title, links }) => (
    <div className="w-full sm:w-1/2 lg:w-[180px] mb-10">
        <h3 className="text-white font-bold text-lg mb-6">
            {title}
        </h3>
        <ul className="space-y-2">
            {links.map((item) => (
                <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm">
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

/* ============================================================
   MAIN FOOTER
============================================================ */

const Footer = () => {
    return (
        <footer className="w-full">

            <NewsletterSection />

            {/* Main Footer */}
            <div className="bg-[#222222] text-white px-4 py-16">
                <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap justify-between gap-10">

                    {/* Brand Section */}
                    <div className="w-full pl-2 lg:w-1/4">
                        <h2 className="text-xl font-bold mb-4 tracking-widest">
                            FALTU FASHION
                        </h2>

                        <p className="text-gray-400 text-sm">Lorem Ipsum, 235 Simply,</p>
                        <p className="text-gray-400 text-sm">printing, Pin 309 309</p>
                        <p className="text-gray-400 text-sm mt-2">faltufashion@gmail.com</p>
                        <p className="text-gray-400 text-sm">+1 00000 00000</p>
                    </div>

                    {/* Footer Columns */}
                    <div className="flex flex-wrap w-full lg:w-auto gap-10">
                        <FooterColumn
                            title="Information"
                            links={[
                                { name: "Men", href: "#" },
                                { name: "Women", href: "#" },
                                { name: "Kids", href: "#" },
                                { name: "Home & Living", href: "#" },
                                { name: "Beauty", href: "#" },
                            ]}
                        />

                        <FooterColumn
                            title="Explore"
                            links={[
                                { name: "Blog", href: "#" },
                                { name: "Gift Cards", href: "#" },
                                { name: "Financing", href: "#" },
                                { name: "Reviews", href: "#" },
                            ]}
                        />

                        <FooterColumn
                            title="Contact Us"
                            links={[
                                { name: "FAQ", href: "#" },
                                { name: "Track Orders", href: "#" },
                                { name: "Shipping", href: "#" },
                                { name: "Cancellation", href: "#" },
                                { name: "Returns", href: "#" },
                            ]}
                        />

                        <FooterColumn
                            title="Support"
                            links={[
                                { name: "Help Center", href: "#" },
                                { name: "News", href: "#" },
                                { name: "Career", href: "#" },
                                { name: "Terms of Use", href: "#" },
                            ]}
                        />
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1A1A1A] text-gray-400 py-5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">

                    <div className="flex flex-col md:flex-row gap-4 text-sm">
                        <p>© 2025 Faltu Fashion, All Rights Reserved.</p>
                        <p className="hover:text-white cursor-pointer">Privacy Policy</p>
                        <p className="hover:text-white cursor-pointer">Terms & Conditions</p>
                    </div>

                    <div className="flex gap-6">
                        <img src="/icons/facebook.svg" className="h-5 w-5 cursor-pointer" />
                        <img src="/icons/instagram.svg" className="h-5 w-5 cursor-pointer" />
                        <img src="/icons/twitter.svg" className="h-5 w-5 cursor-pointer" />
                        <img src="/icons/pinterest.svg" className="h-5 w-5 cursor-pointer" />
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
