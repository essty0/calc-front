import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import axios from "axios";
import moment from "moment";

type DistanceFormProps = {
    carId: string;
};

type FormValues = {
    distance?: number;
};

const DistanceForm: React.FC<DistanceFormProps> = ({carId = ""}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [timeArray, setTimeArray] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/car/calc`,
                {_id: carId, distance: Number(data.distance)}
            );
            //toast(result.data);
            setTimeArray(result.data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
    }

    const getTime = () => {
        const sec= moment.duration(timeArray, "seconds");
        if (timeArray > 59 && timeArray < 3600) return  `${sec.asMinutes().toFixed(1)}min`; // return as minutes
        else if (timeArray >= 3600 && timeArray < 86400) return `${sec.asHours().toFixed(1)}h`; // return as hours
        else if (timeArray >= 86400) return `${sec.asDays().toFixed(1)}days`; // return as days
        else return `${sec.asSeconds().toFixed(1)}sec`; // return as seconds
    }


    return <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <input
                {...register("distance",
                    { required: "This field is required",
                        min: { value: 0, message: "Distance must be positive" },
                        max: { value: 40075696, message: "Maximum is 40 075 696km" },
                    })}
                type="number"
                className="border-b-2 border-gray-700 px-2 mt-2 w-32 text-center focus:outline-0 focus:border-t-0"
                max={40075696}
                placeholder={isFocused ? "" : "0"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                step={1}
            />
            <span className="self-end">km</span>
            <button
                className="pointer-events-auto rounded-md bg-blue-950 px-3 py-2 text-[0.8125rem]/5 font-semibold text-white hover:bg-blue-800">Count time
            </button>
            <span className="self-end">
                {timeArray && getTime()}
            </span>
            {errors.distance && <span className="text-red-600 text-sm mt-1 self-center">
                {typeof errors.distance.message === "string" ? errors.distance.message : "An error occurred"}
            </span>}
        </form>
    </div>
}

export default DistanceForm;
