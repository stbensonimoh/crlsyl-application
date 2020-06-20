'use strict'
document.addEventListener('DOMContentLoaded', () => {
  const date = new Date()
  const year = date.getFullYear()
  const yearContent = document.querySelector('#year')
  yearContent.innerHTML = year

  // Capitalize first letter of First Name and Last Name
  document.querySelector('#firstName').onchange = e => {
    let val = document.querySelector('#firstName').value
    RegExp = /\b[a-z]/g

    val = val.charAt(0).toUpperCase() + val.substr(1)
  }

  document.querySelector('#lastName').onchange = e => {
    let val = document.querySelector('#lastName').value
    RegExp = /\b[a-z]/g

    val = val.charAt(0).toUpperCase() + val.substr(1)
  }

  document.querySelector('#email').onchange = e => {
    let val = document.querySelector('#email').value
    RegExp = /\b[a-z]/g

    val = val.toLowerCase()
  }

  // Add intl-tel-input
  window.intlTelInputGlobals.loadUtils('scripts/utils.js')
  var input = document.querySelector('#phone')
  window.intlTelInput(input, {
    initialCountry: 'ng',
    separateDialCode: true,
    hiddenInput: 'full_phone',
    utilsScript: 'scripts/utils.js'
  })

  const elems = document.querySelectorAll('select')
  const elem = document.querySelector('select')
  const instances = M.FormSelect.init(elems)
  const instance = M.FormSelect.getInstance(elem)
  const count = document.querySelectorAll('textarea')
  M.CharacterCounter.init(count)

  const dob = document.querySelectorAll('.datepicker')
  const dateInstance = M.Datepicker.init(dob, {
    yearRange: [1905, 2001]
  })

  //   Submit the form
  const form = document.querySelector('form')

  // On Form Submit
  form.addEventListener('submit', e => {
    // Check to see if form has validation errors
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    // If form doesn't have validation errors
    if (form.checkValidity() === true) {
      e.preventDefault()

      // change the button color and add the loading class
      //   document.querySelector('button').classList.remove('btn-danger')
      document.querySelector('button').classList.add('btn-primary')
      document.querySelector('button').innerHTML =
        'Loading <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>'

      // Create Form Variables
      const firstName = document.querySelector("input[name='firstName'").value
      const lastName = document.querySelector("input[name='lastName'").value
      const email = document.querySelector("input[name='email'").value
      const phone = document.querySelector("input[name='full_phone'").value
      const dateOfBirth = document.querySelector("input[name='dateOfBirth'")
        .value
      const gender = document.querySelector("input[name='gender'").value
      const residentInAbuja = document.querySelector(
        "input[name='residentInAbuja'"
      ).value
      const organisationName = document.querySelector(
        "input[name='organisationName'"
      ).value
      const studentLevel = document.querySelector("select[name='studentLevel'")
        .value
      const yearOfCallToBar = document.querySelector(
        "select[name='yearOfCallToBar'"
      ).value
      const previousHumanRightsEducation = document.querySelector(
        "textarea[name='previousHumanRightsEducation'"
      ).value
      const areaOfInterest = document.querySelector(
        "textarea[name='areaOfInterest'"
      ).value
      const expectationAndMotivation = document.querySelector(
        "textarea[name='expectationAndMotivation'"
      ).value
      const benefitsOfCourse = document.querySelector(
        "textarea[name='benefitsOfCourse'"
      ).value
      const referral = document.querySelector("input[name='referral'").value

      // construct formData
      const formBody = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dateOfBirth: dateOfBirth,
        gender: gender,
        residentInAbuja: residentInAbuja,
        organisationName: organisationName,
        studentLevel: studentLevel,
        yearOfCallToBar: yearOfCallToBar,
        previousHumanRightsEducation: previousHumanRightsEducation,
        areaOfInterest: areaOfInterest,
        expectationAndMotivation: expectationAndMotivation,
        benefitsOfCourse: benefitsOfCourse,
        referral: referral
      }

      // send it for processing
      fetch('https://hbbafrica-api.herokuapp.com/course/apply', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.message === 'Applicant created Successfully') {
            swal(
              'Application submitted successfuly!',
              'Your course Application was successful!',
              'success'
            )
            setTimeout(
              (window.location = 'https://hopebehindbarsafrica.org'),
              3000
            )
          } else {
            swal('Already applied!', 'You have already applied!', 'warning')
            setTimeout(
              (window.location = 'https://hopebehindbarsafrica.org'),
              3000
            )
          }
        })
        .catch(err => {
          console.log('The request failed', err)
        })
    }
  })
})
