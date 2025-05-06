
function Options({name, countries, isSelected, handler}){
const handleChange = (e)=>{
    handler(e.target.id, e.currentTarget.value);
}

return(
    <div style={{padding: "5px"}}>

    <select id={name} onChange={handleChange} disabled={isSelected} >
        <option value="">{`Select ${name}`}</option>
        {countries.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
        })}
    </select>
        </div>

)


}

export default Options;