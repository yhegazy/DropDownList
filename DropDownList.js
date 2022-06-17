import {useState} from 'react'

import { PopupboxManager } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"
   
const DropDownList = (props) => {
    const {localComponent, subMenu} = props
    const [dropDownOption, setDropDownOption] = useState("")
    const [dropDownList, setDropDownList] = useState([])

    const handleDropDownList = (targetValue) => {
        if(targetValue === 'Create New List') {
            //Prompt user to name new list or use default name
            let listName = prompt("New List Name: ", `${localComponent} ${dropDownList.length> 0 ? dropDownList.length+1 : 1}`)

            //Ensure listName exists and does not count if null. Automatically set option to user's list name
            listName !== null && setDropDownList(prevState => [...prevState, listName])
            setDropDownOption(listName)
            
        } else setDropDownOption(targetValue) //if user decides to use a different list.

        //A popup will be used to show the list names alongside a trash bin to delete.
        if(targetValue === 'Delete List') {
            const content = (<div className="flex flex-row flex-wrap">
                {dropDownList.length > 0 &&
                    <table className="table">
                        <thead><tr><th scope="col" key="LSHEADER">List Name</th></tr></thead>
                        <tbody>
                            {dropDownList.map((option) =>  <tr  className="">
                                <td>{option}</td>
                                <td>
                                    <button onClick={(e) => handleRemoveButton(e)} value={option}>
                                        <svg className="w-5 h-5"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                }
            </div>)

            PopupboxManager.open({ content })
            setDropDownOption("Select One")
        }    
    }

     const handleRemoveButton = (e) => {
        const update = dropDownList.filter((option) => option !== e.currentTarget.value)
            setDropDownList([...update]) 
        PopupboxManager.close()
    }
    
    return <div className="w-1/6 px-3 pb-1 my-4 bg-transparent bg-gray-100 rounded shadow">
            <h4 className='flex justify-center text-lg'>Add New {localComponent} </h4>
            <select className="border-black" name="type" value={dropDownOption} onChange={e => handleDropDownList(e.target.value) }>
            <option>Select One</option>
            <option>Create New List</option>
            {dropDownList.map((name) => <option key={`${subMenu}-${name}`}>{name}</option>)}
            {dropDownList.length > 0 && <option>Delete List</option>}
        </select>
    </div>
}
  
export default DropDownList
