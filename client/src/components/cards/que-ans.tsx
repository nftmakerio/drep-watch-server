interface QueAnsCardProps {
    
};

const QueAnsCard: React.FC<QueAnsCardProps> = ({  }: QueAnsCardProps): React.ReactNode => {
    return (
        <div
            className="border-brd-clr border rounded-xl flex flex-col"
        >
            <div className="my-4 mx-[18px] flex justify-between items-center">
                card
            </div>
        </div>
    );
};

export default QueAnsCard;