import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ISubmit} from "../../types";
import axiosApi from "../../axiosApi";
import AddForm from "../AddForm/AddForm";
import Spinner from "../../components/Spinner/Spinner";

const EditForm = () => {

    const { id } = useParams();

    const [editMeal, setEditMeal] = useState<ISubmit | null>(null);

    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const getOneMeal = await axiosApi.get<ISubmit>(`/meals/${id}.json`);
            setEditMeal(getOneMeal.data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            void fetchData(id);
        }
    }, [fetchData, id]);

    return (
        <div>
            {!loading && editMeal ? (
                <AddForm
                    title="Edit a quote"
                    btnTitle="Save"
                    editMeal={editMeal}
                />
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default EditForm;