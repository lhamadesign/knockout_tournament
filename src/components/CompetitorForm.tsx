import React from 'react';
import { Competitor } from '../models/Competitor';
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask';

type CompetitorFormProps = { 
    competitor?: {
        value: Competitor;
        index: number;
    };
    submit: (competitor: Competitor, index?: number) => void;
};

type CompetitorFormState = {
    fullName: {
        value: string;
        invalid: boolean;
    } 
    phone: {
        value: string;
        invalid: boolean;
    } 
    email: {
        value: string;
        invalid: boolean;
    } 
}

export default class CompetitorForm extends React.Component<CompetitorFormProps, CompetitorFormState> {
    state: CompetitorFormState;

    constructor(props: CompetitorFormProps) {
        super(props);
        if (props.competitor) {
            const competitorToUpdate = props.competitor;
            const state = {
                fullName: {
                    value: competitorToUpdate.value.fullName,
                    invalid: false
                },
                phone: {
                    value: competitorToUpdate.value.phone,
                    invalid: false
                },
                email: {
                    value: competitorToUpdate.value.email,
                    invalid: false
                }
            };

            this.state = state;
        } else {
            this.state = {
                fullName: {
                    value: "",
                    invalid: false
                },
                phone: {
                    value: "",
                    invalid: false
                },
                email: {
                    value: "",
                    invalid: false
                },
            };
        }
    }

    componentDidMount() {
        $('input[name=phone]').mask('(00) 00000-0000', {
            placeholder: '(00) 00000-0000'
        });
    }

    validateFullName = (fullName: {value: string; invalid: boolean}) => {
        if (fullName.value) {
            const fullNameRule = new RegExp(/^[ a-zA-Z\-\']+$/);
            if (fullNameRule.test(fullName.value)) {
                fullName.invalid = false;
                this.setState({fullName: fullName});
                return true;
            }
        }
        fullName.invalid = true;
        this.setState({fullName: fullName});
        return false;
    }

    validatePhone = (phone: {value: string; invalid: boolean}) => {
        if (phone.value) {
            const phoneRule = new RegExp(/\(\d{2}\) ?\d{5}\-\d{4}$/);
            if (phoneRule.test(phone.value)) {
                phone.invalid = false;
                this.setState({phone: phone});
                return true;
            }
        }
        phone.invalid = true;
        this.setState({phone: phone});
        return false;
    }

    validateEmail = (email: {value: string; invalid: boolean}) => {
        if (email.value) {
            const emailRule = new RegExp(/\S+@\S+\.\S+/);
            if (emailRule.test(email.value)) {
                email.invalid = false;
                return true;
            }
        }
        email.invalid = true;
        this.setState({email: email});
        return false;
    }

    validateForm = () => {
        let { fullName, phone, email } = this.state;
        let fullNameValidated = this.validateFullName(fullName),
            phoneValidated = this.validatePhone(phone),
            emailValidated = this.validateEmail(email);

        if (fullNameValidated && phoneValidated && emailValidated) {
                this.onSave();
        }
    }

    onSave = () => {
        const { fullName, phone, email } = this.state;
        let newCompetitor = new Competitor(fullName.value, phone.value, email.value);
        if (newCompetitor) {
            if (this.props.competitor) {
                this.props.submit(newCompetitor, this.props.competitor.index);
            } else {
                this.props.submit(newCompetitor);
            }
        }
        return false;
    }

    onFullNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fullNameValue = event.target.value;
        this.setState({
            fullName: {
                value: fullNameValue,
                invalid: false
            }
        });
    }

    onPhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = event.target.value;
        this.setState({
            phone: {
                value: phoneValue,
                invalid: false
            }
        });
    }

    onEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        this.setState({
            email: {
                value: emailValue,
                invalid: false
            }
        });
    }

    render() {
        return (
            <section>
                <h3>Adicionar Participante</h3>
                <form>
                    <fieldset>
                        <label>Nome:</label>
                        <input type="text" defaultValue={this.state.fullName.value} onChange={this.onFullNameInput} />
                        {this.state.fullName.invalid && <span style={{color: 'red'}}>Nome inválido</span>}
                    </fieldset>
                    
                    <fieldset>
                        <label>Telefone:</label>
                        <input name="phone" type="phone" defaultValue={this.state.phone.value} onChange={this.onPhoneInput}/>
                        {this.state.phone.invalid && <span style={{color: 'red'}}>Telefone inválido</span>}
                    </fieldset>
                    
                    <fieldset>
                        <label>Email:</label>
                        <input type="email" defaultValue={this.state.email.value} onChange={this.onEmailInput} />
                        {this.state.email.invalid && <span style={{color: 'red'}}>e-Mail inválido</span>}
                    </fieldset>
                    
                    <button type="button" onClick={() => this.validateForm()}>Salvar</button>
                </form>
            </section>
        );
    }
}