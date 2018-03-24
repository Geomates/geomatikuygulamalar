import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Header, Divider, Form, Message } from 'semantic-ui-react'
import ReCAPTCHA from '../captcha/ReCAPTCHA';

class Contact extends Component {
    state = { name: "", email: "", message: "", recaptcha: "", isFormValid: true, isFormSubmitted: false, validationMessages: [], serverErrorMessage: "" }
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        let validationMessages = [];
        if (!this.state.email){
            validationMessages.push("e-Posta boş bırakılamaz.")
        }
        if (!this.state.name){
            validationMessages.push("İsim boş bırakılamaz.")
        }
        if (!this.state.message){
            validationMessages.push("Mesaj boş bırakılamaz.")
        }
        if (!this.state.recaptcha){
            validationMessages.push("Doğrulama boş bırakılamaz.")
        }
        if (validationMessages.length === 0)
        {
            axios.post('https://api.geomatikuygulamalar.com/gu/production/contact_form', {
                recaptcha: this.state.recaptcha,
                email: this.state.email,
                name: this.state.name,
                message: this.state.message
            })
            .then((response) => {
                let isFormValid = response.data.errorMessage === undefined;
                this.setState({isFormValid: isFormValid });
                if (!isFormValid)
                {
                    this.setState({serverErrorMessage: response.data.errorMessage });
                }else{
                    this.setState({isFormSubmitted: true });     
                }
            })
            .catch((error) => {
                this.setState({isFormValid: false, serverErrorMessage: error });
            });
        }
        else{
            this.setState({isFormValid: validationMessages.length === 0, validationMessages: validationMessages });
        }
    }

    render() {
        return (
            <div>
                <Header as="h3">İletişim</Header>
                <Divider/>
                <Grid divided stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Proje Danışmanı:</th>
                                        <td>Prof. Dr. Rahmi Nurhan Çelik</td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>celikn[at]itu[dot]edu[dot]tr</td>
                                    </tr>
                                    <tr>
                                        <th>Proje Lideri:</th>
                                        <td>Mete Ercan Pakdil</td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>mete[at]pakdil[dot]org</td>
                                    </tr>
                                    <tr>
                                        <th>GUPA Sorumlusu:</th>
                                        <td>Ali Senem</td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>aly.senem[at]hotmail[dot]com</td>
                                    </tr>
                                    <tr>
                                        <th>İletişim Sorumlusu:</th>
                                        <td>Sevde Pir</td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>sevdepir[at]gmail[dot]com</td>
                                    </tr>                                
                                </tbody>
                            </table>		
                        </Grid.Column>
                        <Grid.Column width={10}>
                        <Form onSubmit={this.handleSubmit.bind(this)} error={!this.state.isFormValid} success={this.state.isFormSubmitted}>
                            <Message
                                error
                                hidden={this.state.isFormValid}
                                header='Hata'
                                list={this.state.validationMessages}
                                content={this.state.serverErrorMessage}
                            />
                            <Message
                                success
                                hidden={!this.state.isFormValid}
                                content='Mesajınız Başarı ile İletildi'
                            />
                            <Form.Input required label="Adınız:" name="name" placeholder="Adınız" onChange={this.handleChange.bind(this)}/>
                            <Form.Input required label="e-Posta Adresiniz:" name="email" placeholder="e-Posta Adresiniz" onChange={this.handleChange.bind(this)}/>
                            <Form.TextArea required label="Mesajınız:" name="message" placeholder="Bize iletmek istediğiniz mesajınızı buraya yazın..." onChange={this.handleChange.bind(this)}/>
                            <Form.Field>
                                <ReCAPTCHA sitekey="6LcZyDMUAAAAALNPkEktxBbxcK2y1SYJCcslF2n0" onChange={this.handleChange.bind(this)}/>
                            </Form.Field>
                            <Form.Button>Gönder</Form.Button>
                        </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

        );
    }
}

export default Contact;