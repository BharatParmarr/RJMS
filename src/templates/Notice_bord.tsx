import { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from './styles/theme'
import Form_dilog from './components/Form_Body'
import styled from 'styled-components'
import { Button, TextField } from '@mui/material'

const StyledDiv = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`
const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`

const StyledButton = styled(Button)`
`

const StyledTextField = styled(TextField)`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`

const StyledDivNoticebord = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const StyledDivNotice = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary}45;
    border-radius: 8px;

`

const StyledNoticeHeading = styled.h2`
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 10px;
    font-size: 18px;
`

const StyledNoticeDiscription = styled.p`
    color: ${({ theme }) => theme.colors.text};
`

const StyledNoticeCreatedTiem = styled.p`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 12px;
    float: right;
    
`


function Notice_bord_form({ setOpen, setData, Data }: any) {

    const { theme } = useTheme()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams()

    const handleSubmit = () => {
        api.post('/notice', {
            title,
            description,
            hostel: id
        }).then(res => {
            console.log(res.data)
            if (res.status === 201) {
                setTitle('')
                setDescription('')
                setOpen(false)
                setData([...Data, res.data])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledForm>
            <StyledTextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
            />
            <StyledTextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, minWidth: '300px' }}
            />
            <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        </StyledForm>
    )

}

function Notice_bord() {
    const { id } = useParams()
    const { theme } = useTheme()
    const navigate = useNavigate()
    type Notice = {
        title: string,
        description: string,
        created_time: string
    }
    const [notice, setNotice] = useState([] as Notice[])

    useEffect(() => {
        api.get('/notice?hostel_id=' + id).then(res => {
            setNotice(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    function NoticeTimeString(time: string) {
        let date = new Date(time)
        return date.toLocaleString()
    }
    return (
        <StyledDiv>
            <br />
            <StyledDivNoticebord>
                {notice.map((item, index) => {
                    return (
                        <StyledDivNotice key={index}>
                            <StyledNoticeHeading>{item.title}</StyledNoticeHeading>
                            <StyledNoticeDiscription>{item.description}</StyledNoticeDiscription>
                            <StyledNoticeCreatedTiem>{NoticeTimeString(item.created_time)}</StyledNoticeCreatedTiem>
                        </StyledDivNotice>
                    )
                })}
            </StyledDivNoticebord>
            <br />
            <Form_dilog title={'New Notice'} Form={Notice_bord_form} setData={setNotice} Data={notice} />
            <br />
        </StyledDiv>
    )
}

export default Notice_bord