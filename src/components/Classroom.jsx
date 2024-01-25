import { Button, Container, Form, Row, Col, Pagination} from "react-bootstrap";
import Student from "./Student";
import { useEffect, useState } from "react";

function createPageArray(numStuds) {
    let items = [];
    for (let i = 0; i < Math.ceil(numStuds/24); i++) {
        items.push(i + 1);
    }
    return items;
}

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [inputName, setInputName] = useState("");
    const [inputMajor, setInputMajor] = useState("");
    const [inputInterest, setInputInterest] = useState("");
    const [shownStudents, setSS] = useState([]);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
            setSS(data);
            setPageList(createPageArray(data.length));
        })
    }, [])

    useEffect(() => {
        let sname = inputName.toLowerCase().trim();
        let smajor = inputMajor.toLowerCase().trim();
        let sinterest = inputInterest.toLowerCase().trim();
        let list = students.filter(s => {
            if ((sname === "" || (s.name.first + " " + s.name.last).toLowerCase().includes(sname))
		    && (smajor === "" || s.major.toLowerCase().includes(smajor))
		    && (sinterest === "" || s.interests.some(i => i.toLowerCase().includes(sinterest))))
		    {
			    return true;
		    } else {
			    return false;
		    }
        })
        setSS(list);
        setPageList(createPageArray(list.length));
        setPage(1);
    }, [inputName, inputMajor, inputInterest])

    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={inputName} onChange={(e) => setInputName(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={inputMajor} onChange={(e) => setInputMajor(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={inputInterest} onChange={(e) => setInputInterest(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={() => {
                setInputName("");
                setInputInterest("");
                setInputInterest("");
            }}>Reset Search</Button>
        </Form>
        <p>There are {shownStudents.length} student(s) matching your search!</p>
        <Container fluid>
            <Row>
                { 
                    shownStudents.slice((page-1)*24, page*24).map(student => {
                        return <Col key={student.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Student {...student}/>
                            </Col>
                    })
                }
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item onClick={()=>{setPage(page => page - 1)}} disabled={(page != 1 && pageList.length != 0)?false:true}>
                Previous
                </Pagination.Item>
            {
                pageList.map(num => {
                    return <Pagination.Item active={page===num} onClick={() => {setPage(num)}}>{num}</Pagination.Item>
                })
            }
            <Pagination.Item onClick={()=>{setPage(page => page + 1)}} disabled={(page != pageList[pageList.length-1] && pageList.length != 0)?false:true}>
                Next
                </Pagination.Item>
        </Pagination>
    </div>

}

export default Classroom;