import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

import ProfileCard from "./cards/profile";
import QueAnsCard from "./cards/que-ans";

import { FILTER_TYPES, FILTERS, SMALL_WIDTHS, WIDTHS } from "~/constants";
import useDeviceType from "~/hooks/use-device-type";

const Home: React.FC = (): React.ReactNode => {
    const [active, setActive] = useState<number>(FILTER_TYPES.LATEST_ANSWERS);

    const deviceType = useDeviceType();


    const getLeftOffset = (): string => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? SMALL_WIDTHS : WIDTHS;

        const activeKeys = Object.keys(ACTIVE_WIDTHS).slice(0, active-1);
        const sum = activeKeys.reduce((acc, key) => acc + parseInt(ACTIVE_WIDTHS[parseInt(key)]!, 10), 0);

        return `${sum}px`;
    };

    const getWidth = () => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? SMALL_WIDTHS : WIDTHS;
        return ACTIVE_WIDTHS[active]
    }

    return (
        <section className="pt-[150px] md:pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <div className="flex flex-col w-full justify-center items-center">
                <div className="p-2 bg-primary-light text-primary flex gap-2 items-center rounded-[10px]">
                    <div className="">
                        <Image 
                            src={"/assets/home/top.png"}
                            width={1000}
                            height={1000}
                            className="h-7 w-auto object-cover rounded"
                            alt="profile"
                        /> 
                    </div>
                    <div className="font-ibm-mono text-[13px] ">
                        over 100+ dreps available here
                    </div>
                </div>

                <div className="mt-5 text-[10vw] md:text-[5vw] flex gap-1 md:gap-5 items-center font-neue-regrade font-semibold flex-col md:flex-row leading-[1] md:leading-normal">
                    <span>
                        Governance with
                    </span>
                    <span className="stroke-text">
                        Transperancy
                    </span>
                </div>

                <div className="w-[90%] md:w-[680px] flex p-4 md:p-5 gap-3 items-center bg-white rounded-xl border border-primary-light shadow-color mt-5 ">
                    <input 
                        type="text" 
                        className="flex-1 w-full bg-transparent outline-none placeholder:text-secondary/60 font-ibm-mono text-[13px] text-secondary font-medium"
                        placeholder="search dreps here"
                    />

                    <FiSearch />
                </div>
            </div>

            <div className="w-full  bg-white px-[5%] py-7 pb-12 flex justify-center items-center shadow-[-5px_0px_13px_0px_#0000001A]">
                <div className="max-w-[1600px] flex flex-col gap-6 md:gap-10 w-full">
                    <div className="w-full flex justify-between items-start md:items-center text-secondary-dark font-inter font-medium tracking-wide flex-col md:flex-row gap-2 ">
                        <div className="text-base md:text-xl">
                            Questions and answers
                        </div>
                        <div className="bg-[#EAEAEA] p-1.5 rounded-lg text-xs md:text-sm text-tertiary">
                            <div className="flex relative  ">
                                {FILTERS.map((filter) => (
                                    <div
                                        key={filter.type}
                                        className={`relative z-[1] px-2 py-1.5 ${active === filter.type ? "text-black " : "text-tertiary"} transition-all duration-200 cursor-pointer`}
                                        onClick={() => setActive(filter.type)}
                                    >
                                        {filter.label}
                                    </div>
                                ))}

                                <div 
                                    className="absolute bg-white mix-blend-overlay shadow-md top-0 left-0 bottom-0 h-full rounded-md transition-all duration-200 z-0" 
                                    style={{left: getLeftOffset(), width: getWidth()}}
                                />
                            </div>
                        </div>
                    </div>

                    {
                        (active === FILTER_TYPES.LATEST_ANSWERS || active === FILTER_TYPES.LATEST_QUESTIONS) &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {
                                    Array(4).fill(0).map((_, i) => (
                                        <QueAnsCard key={i} />
                                    ))
                                }
                            </div>
                    }

                    {
                        active === FILTER_TYPES.EXPLORE_DREPS && 
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {
                                    Array(6).fill(0).map((_, i) => (
                                        <ProfileCard key={i} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;