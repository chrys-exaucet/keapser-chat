import React, {ChangeEvent, useState,} from "react";
import "./CreateAccount.css";
import {useForm} from "react-hook-form";
import LogoKeapserChat from "./logo.svg";
import "react-datepicker/dist/react-datepicker.css";
import "country-state-picker";
import {CountryDropdown} from "react-country-region-selector";
import axios from "axios";


export interface FormData {
    email: string;
    tel: string;
    firstname: string;
    lastname: string;
    hassPass: string;
    birthday: string;
    country: string;
}

const postman = axios.create({
    baseURL: "http://localhost:9090",
    headers: {'Access-Control-Allow-Origin': true},
});


function CreateAccount() {
    const {
        register,
        handleSubmit,
        errors,
    } = useForm<FormData>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
        defaultValues: {
            email: "",
            tel: "",
            firstname: "",
            lastname: "",
            hassPass: "",
            birthday: "",
            country: "",
        },
    });

    const [country, setCountry] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [firstname, setFirstName] = useState<string>("");
    const [lastname, setLastName] = useState<string>("");
    const [hashPass, setHashPass] = useState<string>("");
    const [birthday, setBirthDay] = useState<string>("");

    const onSubmit = (formValues: FormData) => {
        console.log(formValues);
        postman
            .post("/auth/add", formValues)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error, error.response);
            });
    }

    return (
        <div className="createAccount">
            <div className="createAccount__logoContainer">
                <img alt="Logo KeepChat" src={LogoKeapserChat}/>

                <p>Se connecter ou creer un compte</p>
            </div>
            <div className="createAccount__formContainer">
                <div className="createAccount__formContainerTitle">
                    <h1> Creez votre compte</h1>
                    <h2>Vous avez deja un compte ? Connectez-vous</h2>
                </div>
                <div className="createAccount__formContainerContent">
                    <form
                        className="form__content"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="form__RowColumn">
                            <label>Addresse e-mail</label>
                            <input
                                value={email}
                                ref={register({
                                    required: true,
                                    maxLength: 35,
                                })}
                                name="email"
                                type="text"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => setEmail(e.target.value)}
                            />

                            {errors.email?.type === "required" && (
                                <p>Your input is required</p>
                            )}
                            {errors.email?.type === "maxLength" && (
                                <p>
                                    Your input max length is 35 characters
                                </p>
                            )}
                        </div>

                        <div className="form__RowColumn">
                            <label>Numero de telephone</label>
                            <input
                                value={tel}
                                ref={register({
                                    required: true,
                                    maxLength: 15,
                                })}
                                name="tel"
                                type="text"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => setTel(e.target.value)}
                            />
                            {errors.tel?.type === "required" && (
                                <p>Your input is required</p>
                            )}
                            {errors.tel?.type === "maxLength" && (
                                <p>
                                    Your input max length is 15 characters
                                </p>
                            )}
                        </div>
                        <div className="form__RowColumn">
                            <label>Prenom</label>
                            <input
                                value={firstname}
                                ref={register({
                                    required: true,
                                    maxLength: 40,
                                })}
                                name="firstname"
                                type="text"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => setFirstName(e.target.value)}
                            />

                            {errors.firstname?.type === "required" && (
                                <p>Your input is required</p>
                            )}
                            {errors.firstname?.type === "maxLength" && (
                                <p>
                                    Your input max length is 40 characters
                                </p>
                            )}
                        </div>

                        <div className="form__RowColumn">
                            <label>Nom</label>
                            <input
                                value={lastname}
                                ref={register({
                                    required: true,
                                    maxLength: 20,
                                })}
                                name="lastname"
                                type="text"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => setLastName(e.target.value)}
                            />

                            {errors.lastname?.type === "required" && (
                                <p>Your input is required</p>
                            )}
                            {errors.lastname?.type === "maxLength" && (
                                <p>
                                    Your input max length is 20 characters
                                </p>
                            )}
                        </div>

                        <div className="form__RowColumn">
                            <label>Mot de passe</label>
                            <input
                                value={hashPass}
                                ref={register()}
                                name="hassPass"
                                type="password"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => setHashPass(e.target.value)}
                            />
                        </div>
                        <div className="form__RowCustom">
                            <div className="form__RowCustomTitle">
                                <label>Date de naissance</label>
                            </div>
                            <div className="form__RowCustomContent">
                                <input
                                    value={birthday}
                                    ref={register({
                                        required: true,
                                    })}
                                    name="birthday"
                                    type="date"
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setBirthDay(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form__RowColumn">
                            <label>Pays</label>
                            <CountryDropdown
                                value={country}
                                valueType="full"
                                onChange={(val: string) => setCountry(val)}
                            />
                        </div>
                        <div className="form__RowColumn submit__Button">
                            <button type="submit" value="Submit">
                                Creer un compte
                            </button>
                        </div>

                        <p>
                            Protege et soumis aux Politiques de
                            confidentialite et Conditions d'utilisation de
                            KeepChat
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
