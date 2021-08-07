
import { useState } from 'react';
import useInput from '../../hooks/use-input';
import classes from './CheckoutForm.module.css'

const CheckoutForm = () => {

//  const [isFormValid, setFormValid] = useState(false);

const numbers = /[0-9]/;
const [isSent, setIsSent] = useState(false);

 const {
     value: nameValue,
     isValid: enteredNameIsValid,
     hasError: nameInputHasError,
     valueChangeHandler: nameChangeHandler,
     inputBlurHandler: nameBlurHandler,
     reset: resetNameInput,
 } = useInput(value => value.trim() !== '')

 const {
    value: lastNameValue,
    isValid: enteredLastNameIsValid,
    hasError: LastnameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
} = useInput(value => value.trim() !== '')

const {
    value: addressValue,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
} = useInput(value => value.trim() !== '' && numbers.test(value))

 let formIsValid = false


 if (enteredNameIsValid && enteredLastNameIsValid && enteredAddressIsValid) {
    formIsValid = true;
 }

 const formSubmitHandler = (event) => {
     event.preventDefault();

     console.log('Sent!!')
     setIsSent(true)

 resetNameInput();
 resetLastNameInput();
 resetAddressInput();
 }

let sendStatus = '';
isSent ? sendStatus = 'Sent' : sendStatus = 'Send' 

let nameEstate = nameInputHasError? classes['invalid'] : classes['valid'];
let lastEstate = LastnameInputHasError? classes['invalid'] : classes['valid'];
let addressEstate = addressInputHasError? classes['invalid'] : classes['valid'];

return(
<form onSubmit={formSubmitHandler}>
<div className={nameEstate}>
<label htmlFor="name">First Name</label>
<input onChange={nameChangeHandler} onBlur={nameBlurHandler} className={classes['input-box']} id="name" type="text" value={nameValue}/>
</div>
<div className={lastEstate}><label htmlFor="lastName">Last Name</label>
<input onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} className={classes['input-box']} id="lastName" type="text" value={lastNameValue}/>
</div>
<div className={addressEstate}>
<label htmlFor="address">Address</label>
<input disabled={isSent} onChange={addressChangeHandler} onBlur={addressBlurHandler}className={classes['input-box']} id="address" type="text" value={addressValue}/>
</div>
<button disabled={!formIsValid} className={classes.button} type="submit">{sendStatus}</button>
</form>
)
}
export default CheckoutForm