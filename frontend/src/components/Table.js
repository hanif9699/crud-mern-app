import React from "react";
import DataTable from 'react-data-table-component';
import { useSelector,useDispatch } from "react-redux";
import { deleteDetails } from "../reducers/dataSlice";
const Table = () => {
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Image',
            selector: row => row.image,
            cell:row => { return (<div className="img-wrapper"><img src={row.image} alt={row.id} /></div>)}
        },
        // {
        //     name: 'Edit Action',
        //     cell:row => { return (<div className="button-wrapper"><button type="button" className="btn-custom edit-btn">Edit</button></div>)}
        // },
        {
            name: 'Delete Action',
            cell:row => { return (<div className="button-wrapper"><button type="button" className="btn-custom delete-btn" onClick={()=>{dispatch(deleteDetails({id:row.id}))}}>Delete</button></div>)}
        }
    ]
    const data=useSelector(state => state.data.detail)
    return (<DataTable
        // title="User Info Table"
        columns={columns}
        data={data}
    />)
}
export default Table