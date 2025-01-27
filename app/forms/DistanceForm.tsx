import {useForm} from "react-hook-form";
import React from "react";


const DistanceForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async(data: any) => {
    }

    return <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <input
                {...register("distance",
                    { required: "This field is required",
                        min: { value: 0, message: "Distance must be positive" },
                        max: { value: 40075696, message: "Maximum шы 40 075 696km" },
                    })}
                type="number"
                className="border-b-2 border-gray-700 p-2 mt-1 w-32 text-center"
                max={40075696}
                step={1}
            />
            <button
                className="pointer-events-auto rounded-md bg-blue-950 px-3 py-2 text-[0.8125rem]/5 font-semibold text-white hover:bg-blue-800">Count
            </button>
            {errors.distance && <span className="text-red-600 text-sm mt-1 self-center">
                {typeof errors.distance.message === "string" ? errors.distance.message : "An error occurred"}
            </span>}
        </form>
    </div>
}

export default DistanceForm;
