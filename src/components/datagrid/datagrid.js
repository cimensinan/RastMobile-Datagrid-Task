import React, { useState, useEffect } from "react";
import DataGrid, {
  Column,
  Sorting,
  Paging,
  SearchPanel,
  Pager,
  Scrolling,
  FilterRow,
} from "devextreme-react/data-grid";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllData, postData } from "../../api/mockapi-service";
import { HiFilter, HiPlus } from "react-icons/hi";
import "./datagrid.scss";

const Datagrid = () => {
  const [data, setData] = useState([]);
  const allowedPageSizes = [4, 8, "All"];
  const [filterRowVisible, setFilterRowVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    id: "",
    createdAt: "",
    socialMediaLink: "",
    socialMediaName: "",
    description: "",
  };

  const loadData = async () => {
    try {
      const storedData = localStorage.getItem("myData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } else {
        const resp = await getAllData();
        setData(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      await postData(values);
      const updatedData = [...data, values];
      setData(updatedData);
      localStorage.setItem("myData", JSON.stringify(updatedData));
      setShowModal(false);
      formik.resetForm(initialValues);
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object({
    socialMediaLink: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Please enter a valid URL!"
      )
      .required("Please enter your social media link"),
    socialMediaName: Yup.string().required(
      "Please enter the name of the social media"
    ),
    description: Yup.string().required(
      "Please enter a description about your social media"
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    loadData();
    const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
        // Enter key
        event.preventDefault();
        formik.handleSubmit();
      } else if (event.keyCode === 27) {
        // Escape key
        event.preventDefault();
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line
  }, []);

  const handleCancel = () => {
    setShowModal(false);
  };

  const toggleFilterRow = () => {
    setFilterRowVisible(!filterRowVisible);
  };

  return (
    <div className="datagrid">
      <Row className="mb-3">
        <Col sm={6}>
          <Button variant="light" onClick={toggleFilterRow}>
            <HiFilter />
          </Button>
        </Col>
        <Col sm={6}>
          <div className="btn-container">
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              className="mb-auto"
            >
              <HiPlus /> <span>Yeni Hesap Ekle</span>
            </Button>
          </div>
        </Col>
      </Row>
      <DataGrid
        dataSource={data}
        showBorders={true}
        height={550}
        keyExpr="id"
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showColumnLines={true}
      >
        <Scrolling rowRenderingMode="virtual"></Scrolling>
        <SearchPanel
          visible={true}
          highlightSearchText={true}
          searchVisibleColumnsOnly={true}
          width={250}
          placeholder="Search objects..."
        />
        <FilterRow visible={filterRowVisible} />
        <Sorting mode="multiple" />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode="compact"
          showPageSizeSelector={true}
          showInfo={false}
          showNavigationButtons={true}
        />
        <Paging defaultPageSize={4} />
        <Column
          dataField="socialMediaLink"
          caption="Sosyal Medya Linki"
          allowSorting={true}
        />
        <Column
          dataField="socialMediaName"
          caption="Sosyal Medya Adı"
          allowSorting={true}
        />
        <Column
          dataField="description"
          caption="Açıklama"
          allowSorting={true}
        />
      </DataGrid>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Hesap Ekle</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formSocialMediaLink">
              <Form.Label>Sosyal Medya Linki</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("socialMediaLink")}
                isValid={
                  formik.touched.socialMediaLink &&
                  !formik.errors.socialMediaLink
                }
                isInvalid={
                  formik.touched.socialMediaLink &&
                  !!formik.errors.socialMediaLink
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.socialMediaLink}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formSocialMediaName">
              <Form.Label>Sosyal Medya Adı</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("socialMediaName")}
                isValid={
                  formik.touched.socialMediaName &&
                  !formik.errors.socialMediaName
                }
                isInvalid={
                  formik.touched.socialMediaName &&
                  !!formik.errors.socialMediaName
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.socialMediaName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...formik.getFieldProps("description")}
                isValid={
                  formik.touched.description && !formik.errors.description
                }
                isInvalid={
                  formik.touched.description && !!formik.errors.description
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Kaydet
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Vazgeç
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <span className="show">Show:</span>
    </div>
  );
};

export default Datagrid;
