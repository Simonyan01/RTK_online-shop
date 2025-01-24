import { decrease, increase, remove, userList } from "./users.slice"
import { useDispatch, useSelector } from "react-redux"

export const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(userList)

    const handleDelete = (id) => {
        dispatch(remove(id))
    }

    const handleSalaryUp = (id) => {
        dispatch(increase(id))
    }

    const handleSalaryDown = (id) => {
        dispatch(decrease(id))
    }

    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>age</th>
                        <th>salary</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, name, age, salary }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{salary}</td>
                            <td>
                                <button onClick={() => handleSalaryUp(id)}>
                                    Up
                                </button>
                                <button onClick={() => handleSalaryDown(id)}>
                                    Down
                                </button>
                                <button onClick={() => handleDelete(id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
