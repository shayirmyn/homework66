import React, {useCallback, useEffect, useState} from 'react';
import {IApiGet, IGet} from "../../types";
import axiosApi from "../../axiosApi";
import {Link, NavLink} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const Get = () => {

    const [meals, setMeals] = useState<IGet[]>([]);

    const [loading, setLoading] = useState(false);

    const total = meals.reduce((acc, value) => {
        return acc + parseFloat(value.calories);
    }, 0)

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
        } catch (e) {
            console.error(e);
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
            setLoading(true);
            await axiosApi.delete(`/meals/${id}.json`);
            setMeals((prevState) => prevState.filter((every) => every.id !== id));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="card text-center postCard shadow-lg p-3 mt-5 bg-body-tertiary">
            <div  className="bg-body-tertiary shadow-lg card-header">
                <h4 className="d-inline-block me-5">
                    Meals calories: {total}
                </h4>
                <span className="ms-5 d-inline-block">
                <NavLink to="/new-meal" className="btn btn-primary">Add meal</NavLink>
            </span>
            </div>
            {loading ? (<Spinner />): (
                meals.map((every: IGet) => (
                    <div key={every.id}>
                        <div className="innerPost mt-2 mb-2 shadow-lg p-2 bg-body-tertiary">
                            <h5 className="card-header"><span className="span">Time meal:</span> {every.meal}</h5>
                            <div className="card-body">
                                <p>To eat: <strong>{every.description}</strong></p>
                                <p>Calories: <strong>{every.calories}</strong></p>
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