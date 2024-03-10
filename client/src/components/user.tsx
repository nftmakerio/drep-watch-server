import Image from "next/image";
import { useEffect, useState } from "react";
import { UserType } from "~/types";

interface UserProps {
    user: UserType
};

const User: React.FC<UserProps> = ({ user }: UserProps): React.ReactNode => {
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {
        const animatePercentage = () => {
            let currentPercentage = 0;
            const interval = setInterval(() => {
                currentPercentage += 1;
                setPercentage(currentPercentage);

                if (currentPercentage >= Math.floor((user.questionsAnswered / user.totalQuestions) * 100)) {
                    clearInterval(interval);
                }
            }, 10);
        };

        setTimeout(animatePercentage, 1000);
    }, [user.questionsAnswered, user.totalQuestions]);

    return (

        <div className="flex flex-col gap-7">
            <p className="text-center text-sm font-semibold text-tertiary font-ibm-mono ">
                You’re asking question to
            </p>
            <div className="flex flex-col items-center ">
                <Image
                    src={user.img}
                    width={1000}
                    height={1000}
                    className="w-[140px] rounded-lg"
                    alt={user.username}
                />
                <span className="rounded-lg bg-primary-light px-[18px] py-2 font-semibold text-primary -translate-y-2 font-ibm-mono text-xs md:text-[13px] tracking-wide">
                    {user.walletId}
                </span>
            </div>
            <h2 className="text-4xl font-semibold leading-[1] text-center">{user.username}</h2>

            <div className="flex h-[100px] w-[280px] border border-brd-clr rounded-2xl bg-[#F5F5F5] px-[18px] py-3.5">
                <div className="relative flex-1">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                            style={{ strokeWidth: '6', stroke: '#FFDACC', fill: 'transparent' }}
                            cx="50"
                            cy="50"
                            r="40"
                        ></circle>
                        <circle
                            style={{
                                strokeWidth: '6',
                                strokeLinecap: 'round',
                                stroke: '#FF4700',
                                fill: 'transparent',
                                strokeDasharray: '250',
                                strokeDashoffset: `calc(250 - (250 * ${percentage}) / 100)`,
                            }}
                            cx="50"
                            cy="50"
                            r="40"
                        ></circle>
                    </svg>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-orange-500 font-ibm-mono text-base tracking-wide ">
                        {percentage + "%"}
                    </span>
                </div>

                <div className="flex flex-[2_2_0%] flex-col justify-center gap-2 pl-3 text-xl md:text-2xl">
                    <p className="font-inter font-medium tracking-wide">
                        <span className="font-semibold">{user.questionsAnswered}</span>
                        <span className="font-semibold text-gray-400">
                            {" / " + user.totalQuestions}
                        </span>
                    </p>
                    <span className="inline-block text-xs md:text-sm font-semibold text-tertiary font-ibm-mono">
                        questions answered
                    </span>
                </div>
            </div>
        </div>
    );
};

export default User;


