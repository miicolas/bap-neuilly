"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const exampleImages = [
    {
        url: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/468500297_983477523808554_981648330574228164_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VnuRl1JNqgIQ7kNvgFG2VEJ&_nc_oc=AdhNlowTv0A70uyu9Sdg5f6NiNPzTRYBnPEIOLpZiL0emyLaZLp_r8WrFn7DODD25bg&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=As0zDFvnu9rD4jl8dEJA1BI&oh=00_AYBYzs7z85z0g2VzGkBaI5t2V1nyYjxU1io8lf_9SAq9YA&oe=67C3B68B",
        author: "Branislav Rodman",
        title: "A Black and White Photo of a Woman Brushing Her Teeth",
    },
    {
        url: "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/468527362_983477750475198_1814424351376657587_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2KN0CHcyTAcQ7kNvgED51ZX&_nc_oc=Adg1P1INGrhVDXfi-kmrdTbiShnJgkZV9lD_CrQMPSExK55QN3WuaVapwxSdtxlcz6s&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=ANN7vVHP_hn89KRp__EfsaZ&oh=00_AYBmR_W_EQndHp2gF6L5lCDpHFMqQiyV1PQGVQUCMtnxOg&oe=67C39C28",
        link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
        title: "Neon Palm",
        author: "Tim Mossholder",
    },
    {
        url: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/468662357_983478390475134_3605094339183057832_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PwnD1xUwO0MQ7kNvgGCgAd1&_nc_oc=AdhhPoh8K2v1DHrOtz2kKNlNoa5kHj8kFGMJoKInmi4XQ8l5gxjDfDfBheqcLaK2nQg&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=AM5fnmkQlMjWtedZwwxx3WM&oh=00_AYC1ohcz_dSPBr8CjOj-bIWKuvThK2TckvaAKV5Ujpyqzw&oe=67C3C0F9",
        link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
        author: "ANDRII SOLOK",
        title: "A blurry photo of a crowd of people",
    },
    {
        url: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/468334448_983479373808369_1639354209145932742_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PMvTlUJzcG0Q7kNvgHP-gZF&_nc_oc=Adi51WyXfH3yAekdsZj-r4nSBzLKuKS4INePQMuKvM5L7ZeUS3usIcz8OZlpSi6nd9w&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=AcqMqnQLON0MNPCDI9PrHoJ&oh=00_AYDgCNeterrC-4AuiHwPjDTMITWzGx3jsdwp8RGvbyl3qQ&oe=67C3C91A",
        link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
        author: "Wesley Tingey",
        title: "Rippling Crystal Blue Water",
    },
    {
        url: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/468540287_983479260475047_247044258055003630_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eiVdMhts2TsQ7kNvgGYKpFe&_nc_oc=AdgwA9GFHGRiokemLc6AnncOzLDphNAdnHHjzOlmUXxoc6H7504XdW3SZRvMV1i80Lk&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=AAHaaQWEq3fcP79UxGedx2J&oh=00_AYC5mhxMwYzF9YH0gD1WsFa0PBnQXnnQy2r_VwhYdqqp6Q&oe=67C39959",
        author: "Serhii Tyaglovsky",
        title: "Mann im schwarzen Hemd unter blauem Himmel",
    },
    {
        url: "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/468715774_983479637141676_4171297040404465282_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0U7zAtCcJv0Q7kNvgH6xvGj&_nc_oc=AdiL4ZTO50aapTYsiV5eUKa2TDNoQcg5FqwsrAoj_EYMvGT4c4KHKZrl9ighD9scH8I&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=AY7GKmnPxWtsphRe5hiNfKr&oh=00_AYCzo6yC0WNDe3DEhpv3FHvDZF6QTXaF3c7v5cnA1ljzYA&oe=67C3AE44",
        link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
        author: "Vladimir Yelizarov",
        title: "A women with a flower crown on her head",
    },
    {
        url: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/468961674_983479003808406_983246858165906473_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YKWpv5Tv8VoQ7kNvgGWw6Co&_nc_oc=AdjKjQESo0SnMeBJpUTU_KNjj2XAIQj_65rUeHgWjcSJuzR2QiBTW6--eUnv4M_4swk&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=AWQFxFO7uB2WCV7eTuhM3kG&oh=00_AYBNTvXwkeaprU5PGWfjVqPKbGR3TN_kGa1lJoZwxXpQhA&oe=67C3A817",
        title: "A blurry photo of white flowers in a field",
        author: "Eugene Golovesov",
        link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
    },
    {
        url: "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/468836274_983477120475261_710488824340948716_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JA0Vp3StS-EQ7kNvgHspe2l&_nc_oc=AdiObatJw-_IzkB1K9togh2G8YYKedKO_a3N98-Z7y26VSJTXAZXD_YWmPETsfFv-s4&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=A_rpWJ1huvVo9R71DJwg3Hc&oh=00_AYB13GemR0MtvB9DYOak6GKI52vazF_h9gG82Vp30KLbqQ&oe=67C3BFCA",
        author: "Mathilde Langevin",
        link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
        title: "A table topped with two wine glasses and plates",
    },
];

export default function Page() {
    return (
        <section className="w-full h-screen overflow-hidden  flex flex-col items-center justify-center relative ">
            <Floating sensitivity={-0.5} className="h-full">
                <FloatingElement
                    depth={0.5}
                    className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
                >
                    <motion.img
                        src={exampleImages[0].url}
                        alt={exampleImages[0].title}
                        className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={1}
                    className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
                >
                    <motion.img
                        src={exampleImages[1].url}
                        alt={exampleImages[1].title}
                        className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={4}
                    className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
                >
                    <motion.img
                        src={exampleImages[2].url}
                        alt={exampleImages[2].title}
                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={2}
                    className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
                >
                    <motion.img
                        src={exampleImages[3].url}
                        alt={exampleImages[3].title}
                        className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={1}
                    className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
                >
                    <motion.img
                        src={exampleImages[4].url}
                        alt={exampleImages[4].title}
                        className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    />
                </FloatingElement>
            </Floating>

            <div className="flex flex-col justify-center items-center min-w-sm lg:min-w-4xl z-50 pointer-events-auto">
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4 font-bold"
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
                >
                    <span>Découvrez</span>
                    <LayoutGroup>
                        <motion.span layout className="flex whitespace-pre font-semibold ">
                            <motion.span
                                layout
                                className="flex whitespace-pre"
                                transition={{
                                    type: "spring",
                                    damping: 30,
                                    stiffness: 400,
                                }}
                            >
                                l'art{" "}
                            </motion.span>
                            <TextRotate
                                texts={[
                                    "de l'artisanat",
                                    "de la créativité",
                                    "de la beauté",
                                    "de l'innovation",
                                    "de la passion",
                                    "de l'artisanat",
                                    "de la créativité",
                                    "de la beauté",
                                    "de l'innovation",
                                    "de la passion",
                                ]}
                                mainClassName="overflow-hidden pr-3 text-yellow-500 py-0 pb-2 md:pb-4 rounded-xl"
                                staggerDuration={0.03}
                                staggerFrom="last"
                                rotationInterval={3000}
                                transition={{
                                    type: "spring",
                                    damping: 30,
                                    stiffness: 400,
                                }}
                            />
                        </motion.span>
                    </LayoutGroup>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12 max-w-4xl px-8 md:px-0"
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
                >
                    Le Salon des Artisans est un événement unique qui réunit les
                    artisans et les créateurs de l'artisanat de
                    Neuilly-sur-Seine.
                </motion.p>

                <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs p">
                    <Link href="/">
                        <motion.button
                            className="text-lg lg:text-xl font-semibold tracking-tight text-neutral-800 bg-neutral-50 border border-neutral-200 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                                delay: 0.7,
                                scale: { duration: 0.2 },
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: {
                                    type: "spring",
                                    damping: 30,
                                    stiffness: 400,
                                },
                            }}
                        >
                            En savoir plus{" "}
                            <span className="font-serif ml-1">→</span>
                        </motion.button>
                    </Link>
                    <Link href="/visitor-signup">
                        <motion.button
                        className="text-lg lg:text-xl font-semibold tracking-tight text-neutral-800 bg-yellow-500 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                            delay: 0.7,
                            scale: { duration: 0.2 },
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: {
                                type: "spring",
                                damping: 30,
                                stiffness: 400,
                            },
                        }}
                    >
                            Inscrivez-vous
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
