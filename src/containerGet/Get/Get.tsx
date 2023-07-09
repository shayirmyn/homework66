import React, {useCallback, useEffect, useState} from 'react';
import {IApiGet, IGet} from "../../types";
import axiosApi from "../../axiosApi";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const Get = () => {

    const [meals, setMeals] = useState<IGet[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const storiesResponse = await axiosApi.get<IApiGet>("/meals.json");
            if (storiesResponse.data) {
                const getMeals = Object.keys(storiesResponse.data).map((key) => {
                    return {
                        ...storiesResponse.data[key],
                        id: key,
                    };
                });

                setMeals(getMeals);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const emptyArray = () => {
        if (meals.length < 1) {
            return <strong>No Meals!</strong>;
        }
    };

    const deleteRequest = useCallback(async (id: string) => {
        try {
            await axiosApi.delete(`/meals/${id}.json`);
            setMeals((prevState) => prevState.filter((every) => every.id !== id));
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div className="card text-center postCard shadow-lg p-3 mt-5 bg-body-tertiary">
            <h4 className="card-header d-block me-auto ms-2 bg-body-tertiary shadow-lg">
                Meals
            </h4>
            {loading ? (<Spinner />): (
                meals.map((every: IGet) => (
                    <div key={every.id}>
                        <div className="innerPost mt-2 mb-2 shadow-lg p-2 bg-body-tertiary">
                            <div className="card-header">Meals</div>
                            <div className="card-body">
                                <h5 className="card-title">{every.meal}</h5>
                                <Link
                                    className="btn btn-primary"
                                    to={`/meals/${every.id}/edit`}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteRequest(every.id)}
                                    className="btn ms-1 btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {
                emptyArray()
            }
        </div>
    );
};

export default Get;