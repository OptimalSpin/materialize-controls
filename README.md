# materialize-controls

Material UI controls that you can use with React Redux Form

[![Build Status](https://travis-ci.org/OptimalSpin/materialize-controls.svg?branch=master)](https://github.com/OptimalSpin/materialize-controls)

These controls support second popular React/Redux library for a form manipulation [React Redux Form](https://github.com/davidkpiano/react-redux-form) 
leveraged by [Materialize](https://github.com/Dogfalo/materialize) Material UI CSS framework under the hood. It does not use any js code from Materialize since 
it is tightly coupled with jQuery.  

`npm install react-redux-form-materialize@latest --save`

## Installation

```bash
# Dependencies 
npm install materialize react-redux react-redux-form redux --save

npm install react-redux-form-materialize@latest --save
```

##Controls

Currently there are two separate packages:

 * react-redux-form-materialize which contains basic controls
 * react-redux-form-materialize-extra which contains more complicated and opinionated controls like AutoComplete and DatePicker

**react-redux-form-materialize** provides several basic controls which are based on Materialize styles: **TextInput**, **TextArea**, **DropdownInput**, **CheckedInput** (used both for radio and checkbox), **FileInput** and **SwitcherInput**.
You can use each control as a *component* property of an appropriate react-redux-form *Control* component. For some controls (**TextInput**, **TextArea**, **DropdownInput** and **FileInput**) 
you should also provide *mapProps* property which is included in this package (it is used to connect some internals of React Redux Form). Here is a full example:

```jsx
import React from 'react'
import {Control, Form} from 'react-redux-form'
import {TextInput, TextArea, FileInput, CheckedInput, mapProps} from 'react-redux-form-materialize'

class MyForm extends React.Component {
  handleSubmit(val) {    
  }

  render() {
    return (
      <Form model="user" onSubmit={(val) => this.handleSubmit(val)}>
        <div className="row">
           <Control.text type="text" model="user.name" placeholder="My name" 
           component={TextInput} mapProps={mapProps}/>
        </div> 
        <div className="row">
           <Control.text model="user.info"  placeholder="My info" 
           component={TextArea} mapProps={mapProps}/>
        </div> 
        <div className="row">
           <Control.checkbox type="checkbox" model="user.checked" 
           component={CheckedInput} />
        </div> 
        <div className="row">
           <Control.file model="user.doc" placeholder="Input file" 
           buttonText="File" component={FileInput} mapProps={mapProps}/>
        </div>               
        <button>Submit!</button>
      </Form>
    )
  }
}

export default MyForm
```

**react-redux-form-materialize-extra** provides more advanced controls like DatePicker (base on popular [React Infinite Calendar](https://github.com/clauderic/react-infinite-calendar)) 
and AutocompleteInput (based on [React Autosuggest](https://github.com/moroshko/react-autosuggest) )  

##Validation
**TextInput**, **TextArea**, **DropdownInput** supports React Redux Form validation and can be used in conjunction with [React Intl](https://github.com/yahoo/react-intl) to provide internalized error messages (set *messages* property for that purpose).

##Fancy input icons
You can also provide fancy Material icons (for example [React Icons](https://gorangajic.github.io/react-icons/fa.html)) to accompany your TextInput (set *iconPrefix* and *iconFactory* properties to make it work) 
