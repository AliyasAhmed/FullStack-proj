import React, { useReducer, useEffect } from "react";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "SET_COURSES":
      return { ...state, courses: action.payload };
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "ADD_STUDENT":
      return { ...state, students: [...state.students, action.payload] };
    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    case "TOGGLE_POPUP":
      return { ...state, showPopup: action.payload };
    default:
      return state;
  }
};

function MainContent() {
  const initialState = {
    students: [],
    courses: [],
    showPopup: false,
    formData: {
      id: "",
      name: "",
      cohort: "AY 2024-25",
      courseIds: [],
      dateJoined: "",
      lastLogin: "",
      status: true,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { students, courses, showPopup, formData } = state;

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/getusers");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      dispatch({ type: "SET_STUDENTS", payload: data });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      dispatch({ type: "SET_COURSES", payload: data });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FORM_DATA",
      payload:
        name === "courseIds"
          ? { courseIds: [...formData.courseIds, value] }
          : { [name]: value },
    });
  };

  const handleAddStudent = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a valid name");
      return;
    }

    const newStudent = {
      ...formData,
      dateJoined: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:2000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) throw new Error("Failed to add student");
      const createdStudent = await response.json();
      dispatch({ type: "ADD_STUDENT", payload: createdStudent });
      dispatch({ type: "TOGGLE_POPUP", payload: false });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEditStudent = (student) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        id: student.id,
        name: student.name,
        cohort: student.cohort,
        courseIds: student.courses?.map((course) => course.id) || [],
        dateJoined: student.dateJoined,
        lastLogin: student.lastLogin,
        status: student.status,
      },
    });
    dispatch({ type: "TOGGLE_POPUP", payload: true });
  };

  const handleUpdateStudent = async () => {
    const updatedStudent = { ...formData };

    try {
      const response = await fetch(
        `http://localhost:2000/api/students/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudent),
        }
      );
      if (!response.ok) throw new Error("Failed to update student");
      const updatedData = await response.json();
      dispatch({ type: "UPDATE_STUDENT", payload: updatedData });
      dispatch({ type: "TOGGLE_POPUP", payload: false });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:2000/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete student");
      dispatch({ type: "DELETE_STUDENT", payload: id });
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => dispatch({ type: "TOGGLE_POPUP", payload: true })}
          className="bg-[#dfdfdf] text-black px-4 py-2 rounded hover:bg-[#bbbbbb] transition-all"
        >
          + Add new Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 sm:px-4 py-2 text-left">Student Name</th>
              <th className="px-2 sm:px-4 py-2 text-left">Cohort</th>
              <th className="px-2 sm:px-4 py-2 text-left">Courses</th>
              <th className="px-2 sm:px-4 py-2 text-left">Date Joined</th>
              <th className="px-2 sm:px-4 py-2 text-left">Last Login</th>
              <th className="px-2 sm:px-4 py-2 text-left">Status</th>
              <th className="px-2 sm:px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="px-2 sm:px-4 py-2">{student.name}</td>
                  <td className="px-2 sm:px-4 py-2">{student.cohort}</td>
                  <td className="px-2 sm:px-4 py-2">
                    {student.courses?.map((course) => course.name).join(", ")}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{student.dateJoined}</td>
                  <td className="px-2 sm:px-4 py-2">{student.lastLogin}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        student.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-2 sm:px-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4 text-center">
              Add/Update Student
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Cohort</label>
                <input
                  type="text"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Courses</label>
                <select
                  name="courseIds"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded text-sm"
                  multiple
                  value={formData.courseIds}
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm">Date Joined</label>
                <input
                  type="date"
                  name="dateJoined"
                  value={formData.dateJoined}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Last Login</label>
                <input
                  type="date"
                  name="lastLogin"
                  value={formData.lastLogin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded text-sm"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_POPUP", payload: false })
                }
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={formData.id ? handleUpdateStudent : handleAddStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all text-sm"
              >
                {formData.id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
