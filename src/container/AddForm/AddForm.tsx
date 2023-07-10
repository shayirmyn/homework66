import React, {useState} from 'react';
import {ISubmit} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";


interface IProps {
    title?: string;
    btnTitle?: string;
    editMeal?: ISubmit;
}

const AddForm: React.FC<IProps> = ({title, btnTitle, editMeal}) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const initialState = editMeal
        ? {
            ...editMeal,
        }
        : {
            meal: "",
            calories: "",
            description: "",
        };

    const [loading, setLoading] = useState(false);

    const [submitData, setSubmitData] = useState<ISubmit>(initialState);

    const dataChanged = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setSubmitData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (editMeal) {
                setLoading(true);
                await axiosApi.put(`/meals/${id}.json`, submitData);
            } else {
                setLoading(true);
                await axiosApi.post("/meals.json", submitData);
                navigate("/");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div className="col-9 m-auto mt-5 mb-5">
                {title ? title : (<h4>Add a new meal</h4>)}
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group mt-3">
                            <select
                                name="meal"
                                id="meal"
                                value={submitData.meal}
                                onChange={dataChanged}
                                required
                            >
                                <option value="" disabled>
                                    Meals
                                </option>
                                <option value="breakfast">Breakfast</option>
                                <option value="snack">Snack</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="title">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                value={submitData.description}
                                onChange={dataChanged}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="description">Calories</label>
                            <input
                                type="number"
                                id="calories"
                                value={submitData.calories}
                                onChange={dataChanged}
                                name="calories"
                                className="form-control"
                                required
                            />
                        </div>
                        <button disabled={loading}
                                type="submit"
                                className="btn btn-primary ms-auto d-block mt-3 me-2"
                            >
                                {loading && <ButtonSpinner />}
                                {btnTitle ? btnTitle : (<>Add</>)}
                            </button>
                    </form>
            </div>
        </div>
    );
};

export default AddForm;