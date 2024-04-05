import { AdvantageProps } from '@/types/AdvantageProps';
import { MarketingCardProps } from '@/types/MarketingCardProps';

import {  ActivitySquare, CircleFadingPlus, Globe, Headset, LucideIcon, ShieldCheck } from 'lucide-react';

interface HomePageConstants {
    hero: HeroItem[];
    advantages: AdvantageProps[];
    cardsSection: MarketingCardProps[];
}
export interface HeroItem {
    title: string;
    icon: LucideIcon;
}


export const homePageConstants: HomePageConstants = {
    hero: [
        {
            title: "Effortless Appointment Booking",
            icon: CircleFadingPlus ,
        },
        {
            title: "24/7 Customer Support",
            icon: Headset,
        },
        {
            title: "Centralized Clinic Management",
            icon: ActivitySquare ,
        },
    ],

    advantages: [
        {
            title: "Streamlined Appointment Management",
            advantages: [
                "Seamless online scheduling for patients and doctors.",
                "Automated appointment reminders to reduce no-shows.",
                "Easily manage rescheduling and cancellations.",
            ],
            imageSrc: "/images/time-management.svg",
            reversed: false,
        },
        {
            title: "Centralized Clinic Control",
            advantages: [
                "One centralized dashboard for managing multiple clinic locations.",
                "Access real-time updates and data from anywhere, anytime.",
                "Simplified inventory management across all clinics.",
            ],
            imageSrc: "/images/clinic-control.svg",
            reversed: true,
        },
        {
            title: "Customizable Access Levels",
            advantages: [
                "Grant specific permissions to doctors, secretaries, and staff.",
                "Control access to sensitive information for enhanced security.",
                "Foster collaboration with tailored access for each team member.",
            ],
            imageSrc: "/images/access.svg",
            reversed: false,
        },
        {
            title: "Comprehensive Clinic Management",
            advantages: [
                "Digitized patient records for easy access and organization.",
                "Streamlined billing and invoicing processes.",
                "Analyze clinic performance with detailed reporting and analytics.",
            ],
            imageSrc: "/images/server.svg",
            reversed: true,
        },
    ],
    cardsSection: [
        {
            image: "/images/fast.png",
            title: "Fast-paced environments",
            description: "Everything is systemized and managed with a click. Your professional website will load at lightning speed",
        },
        {
            image: "/images/drag.png",
            title: "Build without drag & drops",
            description: "Choose between different pre-designed sections to create a website without the hassle of drag & drop",
        },
        {
            image: "/images/website.png",
            title: "Multilingual websites with a click",
            description: "Create a multilingual website with just the click of a button and translate it to any language",
        },
        {
            image: "/images/security.png",
            title: "Domains, SSL & secured reliable hosting",
            description: "Enjoy fast and reliable web hosting powered by AWS & a secure domain all the time",
        },
    ]
};