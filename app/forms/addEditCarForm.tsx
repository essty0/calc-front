import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

type CarInputs = {
    _id?: string;
    model?: string;
    speed?: number;
}

interface AddEditCarFormProps {
    car: CarInputs;
    onClose: () => void;
    onRefetch: () => void;
}

type FormValues = {
    _id?: string;
    model?: string;
    speed?: number;
};


const AddEditCarForm: React.FC<AddEditCarFormProps> = ({car, onClose, onRefetch}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CarInputs>();

    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        try {
            const res = (car?.model?.length && car?._id)
                ? await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/car/edit`,
                    {_id: car?._id, model: data.model, speed: Number(data.speed)}, {headers: {
                            'Content-Type': 'application/json',
                        }}) // update request
                : await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/car/create`,
                {model: data.model, speed: Number(data.speed)}, {headers: {
                            'Content-Type': 'application/json',
                        }}) // add new car request

            if (res.data) {
                toast.success(`${car?.model?.length ? "Edited " : "Added"} successfully !`);
                onRefetch();
                onClose();
                }
            else toast.info("Errors during saving !");

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
    }

    return (<div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="model" className="font-black">Model</label>
                <input
                    defaultValue={car.model}
                    {...register("model",
                        { required:  "This field is required",
                            maxLength: {
                                value: 75,
                                message: "Maximum length is 75 characters"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9-\s]+$/,
                                message: "Only letters, numbers, and dashes are allowed"
                            }
                        })}
                       placeholder="Car model" type={"text"}
                    className="border border-gray-200 rounded-lg p-2 mt-1"
                    maxLength={75}
                />
                {errors.model && <span className="text-red-600 text-sm mt-1">{errors.model.message}</span>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="speed" className="font-black">Speed</label>
                <input
                    defaultValue={car.speed ? car.speed : undefined}
                    {...register("speed",
                    { required: "This field is required",
                        min: { value: 0, message: "Speed must be positive" },
                        max: { value: 500, message: "Maximum speed is 500 km/h" }
                    })}
                       type="number"
                       placeholder="Speed"
                       className="border border-gray-200 rounded-lg p-2 mt-1"
                />
                {errors.speed && <span className="text-red-600 text-sm mt-1">{errors.speed.message}</span>}
            </div>
            <div className="flex justify-evenly mt-5">
                <button
                    className="pointer-events-auto rounded-md bg-green-700 px-3 py-2 text-[0.8125rem]/5 font-semibold text-white hover:bg-green-600">
                    {car.model?.length ? "Edit " : "Add "} car
                </button>
            </div>
        </form>
    </div>)
}

export default AddEditCarForm;
