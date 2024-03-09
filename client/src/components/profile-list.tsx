import Image from "next/image";
import { useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FILTERS, FILTER_TYPES, SMALL_WIDTHS, WIDTHS } from "~/constants";
import useDeviceType from "~/hooks/use-device-type";

const ProfileList: React.FC = (): React.ReactNode => {
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
        <section className="pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <div className="flex flex-col w-full justify-center items-center">
                <div className="p-2 bg-primary-light text-primary flex gap-2 items-center rounded-[10px]">
                    <div className="">
                        <Image 
                            src={"/assets/profiles/top.png"}
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

                <div className="mt-5 text-[5vw] font-inter flex gap-1 md:gap-5 items-center">
                    <span>
                        Governance with
                    </span>
                    <span>
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
                                    style={{width: getWidth(), left: getLeftOffset()}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {
                            Array(6).fill(0).map((_, i) => (
                                <div 
                                    className="border-brd-clr border rounded-xl flex flex-col" 
                                    key={i}
                                >
                                    <div className="my-4 mx-[18px] flex justify-between items-center">
                                        <Image 
                                            src={"/assets/profiles/card-img.png"}
                                            width={1000}
                                            height={1000}
                                            className="w-[54px] aspect-square object-cover"
                                            alt={`card-img-${i}`}
                                        />

                                        <div className="bg-tertiary-light text-tertiary py-3 px-4 rounded-[10px] font-ibm-mono font-medium text-sm tracking-wide">
                                            uqwdbd8271gd98n13241
                                        </div>
                                    </div>
                                    <div className="bg-[#F5F5F5] border-y border-brd-clr text-secondary p-3 md:p-5 font-semibold font-inter tracking-wide text-center text-sm md:text-base">
                                        Drep of NMKR
                                    </div>
                                    <button className="my-3 py-3 md:py-4 mx-[18px]  flex justify-center items-center gap-2.5 bg-primary-light text-primary rounded-[10px] border border-[#E6E6E6] ">
                                        <BsChatQuoteFill className="text-lg md:text-xl" />
                                        <div className="font-inter font-semibold text-xs md:text-sm tracking-wide ">
                                            Ask question
                                        </div>
                                    </button>

                                    <div className="mb-3 py-3 md:py-4 mx-[18px]  flex justify-center items-center divide-x-2 divide-[#0000002E] font-inter font-medium text-xs md:text-sm text-secondary tracking-wide">
                                        <button className="w-full flex-1 flex justify-center items-center hover:text-primary transition-all duration-500 ">
                                            View profile
                                        </button>
                                        <button className="w-full flex-1 flex justify-center items-center hover:text-primary transition-all duration-500">
                                            Delegate
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileList;