import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { v4 as uuidv4 } from "uuid";
import "./studentData.styles.css";

const StudentDataTable = ({ handlePrint }) => {
  const [allData, setAllData] = useState([]);
  const [allAges, setAllAges] = useState();
  const [allStates, setAllStates] = useState();
  const [allLevels, setAllLevels] = useState();
  const [allGenders, setAllGenders] = useState();

  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [level, setLevel] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const getAllDataApi =
    "https://testapiomniswift.herokuapp.com/api/viewAllData";
  const getAllAgesApi =
    "https://testapiomniswift.herokuapp.com/api/viewAllAges";
  const getAllStatesApi =
    "https://testapiomniswift.herokuapp.com/api/viewAllStates";
  const getAllLevelsApi =
    "https://testapiomniswift.herokuapp.com/api/viewAllLevels";
  const getAllGendersApi =
    "https://testapiomniswift.herokuapp.com/api/viewAllGender";

  const fetchDataOnLoad = () => {
    const getAllData = axios.get(getAllDataApi);
    const getAllAges = axios.get(getAllAgesApi);
    const getAllStatesData = axios.get(getAllStatesApi);
    const getAllLevelsData = axios.get(getAllLevelsApi);
    const getAllGenderData = axios.get(getAllGendersApi);

    axios
      .all([
        getAllData,
        getAllAges,
        getAllStatesData,
        getAllLevelsData,
        getAllGenderData,
      ])
      .then(
        axios.spread((...allData) => {
          const allDataResponse = allData[0].data.data?.students;
          const allAges = allData[1].data?.data;
          const allStates = allData[2].data?.data;
          const allLevels = allData[3].data?.data;
          const allGenders = allData[4].data?.data;

          setAllData(allDataResponse);
          setAllAges(allAges);
          setAllStates(allStates);
          setAllLevels(allLevels);
          setAllGenders(allGenders);
        })
      );
  };

  useEffect(() => {
    fetchDataOnLoad();
  }, []);

  const filterData = new FormData();
  filterData.append("state", state);
  filterData.append("age", age);
  filterData.append("level", level);
  filterData.append("gender", gender);

  const getFilteredData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://testapiomniswift.herokuapp.com/api/filterData",
        filterData
      );

      setAllData(response.data?.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const printResult = () => {
    setTimeout(() => {
      handlePrint();
    }, 3000);
  };

  return (
    <div className="studentData__container">
      <div className="studentData__selectForm-container">
        <h1 className="studentData__container--heading">Student Table Data</h1>
        <div className="selectform__content">
          <form
            action="
            "
            className="form__fields--control"
            onSubmit={(e) => getFilteredData(e)}
          >
            <h1 className="select__inputs--heading">
              Filter Student Table By:
            </h1>
            <FormControl sx={{ m: 2, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-disabled-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                value={age}
                label="Age"
                onChange={(e) => setAge(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {allAges?.map((age) => (
                  <MenuItem value={age.age} key={uuidv4()}>
                    {age.age}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 2, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-disabled-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                value={level}
                label="Level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allLevels?.map((level) => (
                  <MenuItem value={level.level} key={uuidv4()}>
                    {level.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 2, minWidth: 300 }}
              style={{ borderBlockColor: "green" }}
            >
              <InputLabel id="demo-simple-select-disabled-label">
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                value={state}
                label="State"
                onChange={(e) => setState(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allStates?.map((state) => (
                  <MenuItem value={state.name} key={uuidv4()}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 2, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-disabled-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allGenders?.map((gender) => (
                  <MenuItem value={gender.gender} key={uuidv4()}>
                    {gender.gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <button className="search__CTA">Search</button>
          </form>
        </div>
      </div>
      <div className="student__data--table">
        <div className="table__container">
          <table className="table sticky">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Surname</th>
                <th>First Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Level</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((data, index) => (
                <tr key={uuidv4()}>
                  <td>{index + 1}</td>
                  <td>{data.surname}</td>
                  <td>{data.firstname}</td>
                  <td>{data.age}</td>
                  <td>{data.gender}</td>
                  <td>{data.level}</td>
                  <td>{data.state}</td>
                  <td>
                    <button
                      className="download__result--CTA"
                      onClick={() => {
                        navigate(`/view-result/${data.id}`);
                        printResult();
                      }}
                    >
                      Download Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDataTable;
