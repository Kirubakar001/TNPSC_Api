import { useEffect, useState } from "react";
import photo from "../../assets/product-image.jpg";
import UnitsHeader from "@/UI/units/unitHeader";
import LoadingSpinner from "@/components/loading/loadingSpinner";
import UnitList from "../../UI/units/unitList";
import toast from "react-hot-toast";
import {fetchUnits} from "@/api/unitService"

export default function UnitsPage() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    //Delete units
    const [openDialoug, setOpenDialog] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);

    //Add or Edit units
    const [openFormModal, setOpenFormModal] = useState(false);

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                setLoading(true);
                const response = await fetchUnits();
                console.log(response);
                
                if (response.status === 200) {
                    setUnits(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error( "Failed to loading Units");
            } finally {
                setLoading(false);
            }
        };
        fetchUnit();
    }, []);

    //user
    const data = localStorage.getItem("tnpscUser");
    const user = JSON.parse(data);

    return (
        <>
            <div>
                <p className="title text-center mb-5">Units</p>
                <UnitsHeader
                    Onclick={() => {
                        setOpenFormModal(true);
                    }}
                />

                {loading ? (
                    <LoadingSpinner message={"Loading Units...."} />
                ) : units.length === 0 ? (
                    <div className="flex w-full justify-center m-5">
                        <div className="card w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md dark:bg-slate-900">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={photo}
                                        alt="No Data"
                                        className="h-16 w-16 opacity-80"
                                    />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">No Groups Found</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    It looks like there are no units created yet.
                                    <br />
                                    Click <span className="font-medium text-green-600 dark:text-green-400">Add Units</span> to get started.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <UnitList
                        data={units}
                        onEdit={(data) => {
                            setSelectedUnit(data);
                            setOpenFormModal(true);
                        }}
                        onDelete={(data) => {
                            setSelectedUnit(data);
                            setOpenDialog(true);
                        }}
                    />
                )}
            </div>
        </>
    );
}
