import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// Post to: https://reqres.in/

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Please enter your name")
        .min(2, "Needs to be longer"),
    size: yup
        .string()
        .required("Please select a size"),
    ham: yup
        .boolean(true || false),
    pepperoni: yup
        .boolean(true || false),
    babySpinach: yup
        .boolean(true || false),
    mushrooms: yup
        .boolean(true || false),
    garlic: yup
        .boolean(true || false),
    onion: yup
        .boolean(true || false),
    sunDriedTomatom: yup
        .boolean(true || false),
    pineapple: yup
        .boolean(true || false),
    specialInstructrion: yup
        .string()

});

const Form = () => {

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [formState, setFormState] = useState({
        name: "",
        size: "select",
        specialInstructrion: ""
    });

    const [post, setPost] = useState([])
    useEffect(() => {
        formSchema.isValid(formState)
            .then(valid => {
                setButtonDisabled(!valid);
            });
    }, [formState])

    const [errors, setErrors] = useState({
        name: "",
        size: "select",
        specialInstructrion: ""
    });

    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            });
    };

    const formSubmit = event => {
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log(res)
                setPost([post, res.data]);

                setFormState({
                    name: "",
                    size: "select",
                    specialInstructrion: ""
                });
            })

            .catch(err => console.log(err.res))
    }

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };

        validateChange(event);
        setFormState(newFormData);
    }


    return (
        <>

            <div className="errors">
                {errors.name}

                {}

            </div>
            <div className="form">
                <form onSubmit={formSubmit}>

                    <label htmlFor="name">

                        <h5>Guest's Name:</h5>

                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={inputChange}
                        />
                    </label>
                    <label htmlFor="size">

                        <h5>Choice of Size</h5>

                        <select
                            id="size"
                            name="size"
                            onChange={inputChange}

                        >
                            <option value="disabled={buttonDisabled}">Select Size:</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>

                    </label>

                    <h5>Toppings</h5>

                    <h6>Meats:</h6>

                    <label htmlFor="ham">Ham
                <input
                            type="checkbox"
                            name="ham"
                            checked={formState.ham}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="pepperoni">Pepperoni
                <input
                            type="checkbox"
                            name="pepperoni"
                            checked={formState.pepperoni}
                            onChange={inputChange}
                        />
                    </label>


                    <h6>Veggies:</h6>

                    <label htmlFor="babySpinach">Baby Spinach
                <input
                            type="checkbox"
                            name="babySpinach"
                            checked={formState.babySpinach}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="mushrooms">Mushrooms
                <input
                            type="checkbox"
                            name="mushrooms"
                            checked={formState.mushrooms}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="garlic">Garlic
                <input
                            type="checkbox"
                            name="garlic"
                            checked={formState.garlic}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="onion">Onion
                <input
                            type="checkbox"
                            name="onion"
                            checked={formState.onion}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="sunDriedTomato">Sun Dried Tomato
                <input
                            type="checkbox"
                            name="sunDriedTomato"
                            checked={formState.sunDriedTomato}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="pineapple">Pineapple
                <input
                            type="checkbox"
                            name="pineapple"
                            checked={formState.pineapple}
                            onChange={inputChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="specialInstructrion">
                        <h4>Special Instructions</h4>
                        <textarea
                            name="specialInstructrion"
                            value={formState.address}
                            onChange={inputChange}
                        />
                    </label>
                    <pre>{JSON.stringify(post, null, 2)}</pre>
                    <button disabled={buttonDisabled}>Place Order</button>

                </form>
            </div>

        </>
    );
};
export default Form;