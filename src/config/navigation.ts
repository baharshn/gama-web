import type { NavLink, FlightPreset, Testimonial } from "@/types"

export const NAV_LINKS1: NavLink[] = [
    { label: "OVERVİEW", href: "#overview", alignRight: true },
    { label: "SPECS", href: "#specs", alignRight: true },
    { label: "WIKI", href: "#wiki", alignRight: true },
    { label: "TRAINING", href: "#training", alignRight: true },
    { label: "INSURANCE", href: "#insurance", alignRight: true },
]
export const NAV_LINKS2: NavLink[] = [
    { label: "DRONES", href: "#hero" },
    { label: "GIMBALS",    href: "#gimbals" },
    { label: "CAMERA", href: "#" },
    { label: "POWER",href: "#" },
    { label: "WHY GAMA",href: "#why", alignRight: true },
    {label:"COMMUNITY", href: "community", alignRight: true},
    {label:"SUPPORT", href: "support", alignRight: true},
    {label:"STORE", href: "store", alignRight: true},

]

export const FLIGHT_PRESETS: FlightPreset[] = [
    { label: "No Payload",     mins: 50, lbs: 0  },
    { label: "Phoenix LiDAR",  mins: 30, lbs: 11 },
    { label: "Mōvi Carbon",    mins: 22, lbs: 22 },
    { label: "Mapping Camera", mins: 35, lbs: 8  },
]

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "The Alta X delivers boatloads of power with the same responsiveness as previous platforms.",
        name: "Patrick Weir",
        role: "Peacemaker Filmworks",
        avatar: "/avatars/patrick.jpg",
    },
    {
        quote: "The combination of payload capacity, endurance and reliability makes my life easier.",
        name: "Nick Kolias",
        role: "Professional Drone Operator",
        avatar: "/avatars/nick.jpg",
    },
]