import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("*Please enter your name")
        .min(2, "*Needs to be longer"),
    select: yup
        .string()
        .required("*Please select a size"),
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
    sunDriedTomato: yup
        .boolean(true || false),
    pineapple: yup
        .boolean(true || false),
    specialInstructrion: yup
        .string("")

});

const UserForm = () => {

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [formState, setFormState] = useState({
        name: "",
        select: "",
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
        select: "select",
        specialInstructrion: ""

    });
    console.log(errors)
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
                    select: "select",
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

        <div className="form">
            <Form onSubmit={formSubmit}>

                <FormGroup>
                    <Label htmlFor="name">
                        <h3>Guest's Name:</h3>
                    </Label>
                    <Input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                </FormGroup>
                <div className="errors"><h6>{errors.name}</h6></div>

                <FormGroup>
                    <Label htmlFor="select">
                        <h3>Choose Your Size</h3>
                    </Label>
                    <div className="errors"><h6>{errors.select}</h6></div>
                    <Input
                        type="select"
                        id="select"
                        name="select"
                        onChange={inputChange}
                    >
                        <option value="">Select Size:</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </Input>
                </FormGroup>

                <h3>Toppings</h3>
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
                    <h3>Special Instructions</h3>
                    <textarea
                        name="specialInstructrion"
                        value={formState.address}
                        onChange={inputChange}
                    />
                </label>
                <button disabled={buttonDisabled}>Place Order</button>
            </Form>
            <pre>{JSON.stringify(post)}</pre>
        </div>
    );
};
export default UserForm;