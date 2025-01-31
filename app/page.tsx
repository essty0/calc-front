"use client";

import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import AppModal from "@/app/modals/AppModal";
import AddEditCarForm from "@/app/forms/addEditCarForm";
import DistanceForm from "@/app/forms/DistanceForm";

export default function Home() {
    const [carsArray, setCarsArray] = useState([]);

    const [addCarModal, setAddCarModal] = useState(false);
    const [activeCar, setActiveCar] = useState({_id: "", model: "", speed: 0});


  // Get car list
    const   getCarList = async () => {
        try {
            const response = await axios.get(`${process.env.BACK_URL}/api/car/car-list`);
            setCarsArray(response.data);
        } catch (e) {

        }
    }

  // Add new car
    const addCarHandler = () => {
        setAddCarModal(true);
    }

  // Edit car
  const editCarHandler = (id: string) => {
        const getActiveCar = carsArray.find((el:any) => el._id === id);
        if (getActiveCar) {
            setActiveCar(getActiveCar);
            addCarHandler();
        }
  }

  // Delete car
    const deleteCarHandler = async (id: string) => {
        try {
            const result = await axios.post(`${process.env.BACK_URL}/api/car/delete`,
                {_id: id}
            );
            result.data ? toast.success("Deleted !") : toast.info("Not deleted !");
            await getCarList();
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || "An error occurred";
            toast.error(`Error: ${message}`);
        }

    }

  //close modal
    const closeModalHandler = async () => {
        setAddCarModal(false);
        setActiveCar({_id: "", model: "", speed: 0});
        await getCarList();
    }

    // get car list on the first page load
    useEffect(() => {
        getCarList();
    }, []);

  return (
    <>
        <div className="max-w-4xl mx-auto p-10">
            <header>
                <h1 className="text-center text-5xl font-bold my-10">Car speed calculation</h1>
            </header>
            <main className="flex flex-col gap-8 items-start bg-white rounded-lg p-5">
                <button
                    onClick={addCarHandler}
                    className="pointer-events-auto rounded-md bg-green-700 px-3 py-2 text-[0.8125rem]/5 font-semibold text-white hover:bg-green-800">Add car
                </button>
                <h2>{!carsArray.length && "No cars added yet"}</h2>
                <div className="h-96 overflow-y-scroll w-full">
                    {!!carsArray.length && carsArray.map((car: any) => (
                        <div key={car._id} className="w-full mb-10">
                            <div className="text-4xl">{car.model}</div>
                            <div className="mt-1 mb-2"> speed: {car.speed}km/h</div>
                            <div>
                                <span className="font-bold cursor-pointer hover:underline" onClick={() => editCarHandler(car._id)}>Edit</span>
                                <span className="font-bold cursor-pointer hover:underline ml-5 text-red-800" onClick={() => deleteCarHandler(car._id)}>Delete</span>
                            </div>
                            <div>
                                <DistanceForm carId={car?._id}/>
                            </div>
                        </div>
                    ))}
                </div>

                {addCarModal && <AppModal isOpen={addCarModal} onClose={closeModalHandler} className={""} >
                    {<AddEditCarForm
                        car={{speed:activeCar.speed, model: activeCar.model, _id:activeCar._id}}
                        onClose={() => setAddCarModal(false)}
                        onRefetch={getCarList}
                    />}
                </AppModal>}
            </main>
            <ToastContainer />
        </div>
    </>
  );
}
