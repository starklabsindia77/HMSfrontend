import React, { useEffect, useRef, useState } from "react";
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import {
    Box,
    FormControl,
    Card,
    Grid,
    Modal,
    Table,
    InputLabel,
    Button,
    Divider,
    MenuItem,
    TableRow,
    TableBody,
    TableCell,
    CardHeader,
    TableContainer,
    Typography,
    Stack,
    Select,
    Toolbar,
    TextField,
    TextareaAutosize,
    Link,
    Tooltip,
    Input,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAuthContext } from '../../../../auth/useAuthContext';

import moment from "moment";


const close_icon = {
    fontSize: "1.7em",
    position: "absolute",
    right: "10px",
    color: "#999",
    border: "2px solid #999",
    width: "28px",
    textAlign: "center",
    lineHeight: "25px",
    borderRadius: "50px",
    top: "10px",
    height: "28px",
    cursor: "pointer",
};
const styleedit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Comments = ({ ModalVal, setModalVal, path }) => {

    const { control, setValue, watch, resetField } = useFormContext();
    const { user } = useAuthContext();

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'noteComments',
    });
  
    const values = watch();
  
    const [commentsVal, setCommentsVal] = React.useState("");
    
    const [openEdit, setOpenEdit] = useState(false);

    const handleCloseEditModal = () => {
        setModalVal(false);
    };

    const saveComments = () => {
        // console.log("saveComments")
        let obj = {
            name: commentsVal,
            date: new Date(),
            createdBy: user?.displayName
        };
        let Arrdata = [obj];
        if (values.noteComments) {
            values.noteComments.push(obj);
        }
        setCommentsVal("");
    };

    return (<>
        <Modal
            open={ModalVal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleedit} style={{ maxHeight: "600px", overflow: "auto" }}>
                <div
                    style={close_icon}
                    onClick={() => {
                        handleCloseEditModal();
                    }}
                >
                    &times;
                </div>
                
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography
                                id="modal-modal-title"
                                variant="h5"
                                component="h2"
                                style={{ marginBottom: "20px" }}
                            >
                                Invoice Comments
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                style={{ float: "right", marginRight: 25 }}
                                endIcon={<SaveIcon />}
                                //Loading={loaderVal1}
                                onClick={saveComments}
                                disabled={commentsVal.length > 0 ? false : true}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                           
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                id="outlined-basic"
                                label="Enter Notes"
                                //inputProps={{ readOnly: true }}
                                value={commentsVal}
                                onChange={(e) => setCommentsVal(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
              
                {values.noteComments &&
                    values.noteComments.length > 0 &&
                    values.noteComments
                        .sort((a, b) => b.date - a.date)
                        .map((x, i) => (
                            <Grid key={i} container spacing={2} style={{ marginTop: 10 }}>
                                <Grid item xs={8}>
                                    <div
                                        style={{
                                            border: "1px solid #dce0e4",
                                            borderRadius: 7,
                                            padding: 13,
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#737373",
                                                fontSize: 14,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {x.createdBy}
                                        </span>{" "}
                                        &nbsp;{" "}
                                        <span
                                            style={{
                                                color: "#c3b4b4",
                                                fontSize: 13,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            commented {moment(x.date).format("DD/MM/YYYY hh:mm")}
                                        </span>
                                        <br />
                                        <br />
                                        <span>{x.name}</span>
                                    </div>
                                </Grid>
                            </Grid>
                        ))}
            </Box>
        </Modal>

    </>)
}
export default Comments;