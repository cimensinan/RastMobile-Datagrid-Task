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
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllData, postData } from "../../api/mockapi-service";
import { HiFilter, HiPlus } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import "./datagrid.scss";

const Datagrid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const allowedPageSizes = [2, 4, 8, 0];
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
    setLoading(true)
    try {
      await postData(values);
      const updatedData = [...data, values];
      setData(updatedData);
      localStorage.setItem("myData", JSON.stringify(updatedData));
      setShowModal(false);
      formik.resetForm(initialValues);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
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
      {/* Arama Barı, Filtreleme Butonu ve Yeni Hesap Ekleme Butonu */}
      <Row className="mb-3">
        <Col md={6}>
          <Button variant="light" onClick={toggleFilterRow}>
            <HiFilter />
          </Button>
          <Button variant="primary">
            <RiSearch2Line className="search-icon" />
          </Button>
        </Col>
        <Col md={6}>
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
      {/* Datagrid Bölümü */}
      <DataGrid
        dataSource={data}
        showBorders={true}
        height={550}
        columnMinWidth={200}
        keyExpr="id"
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showAllText="All"
        showAll={allowedPageSizes.includes(0)}
        rowAlternationEnabled={true}
        showColumnLines={true}
      >
        <Scrolling rowRenderingMode="virtual"></Scrolling>
        <SearchPanel
          visible={true}
          highlightSearchText={true}
          searchVisibleColumnsOnly={true}
          width={225}
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
          visible={true}
        />
        <Column
          dataField="socialMediaName"
          caption="Sosyal Medya Adı"
          allowSorting={true}
          visible={true}
        />
        <Column
          dataField="description"
          caption="Açıklama"
          allowSorting={true}
          visible={true}
        />
      </DataGrid>
      <span className="show">Show:</span>
      {/* Yeni Hesap Ekle Butonuna Basılınca Açılacak Modal Yapı */}
      <Modal show={showModal} onHide={() => setShowModal(false)} style={{border: "none", borderRadius: "22px"}}>
        <Modal.Header closeButton style={{fontSize: "12px", padding: "1.5rem 1.5rem 0 0", color: "black"}}></Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit} className="px-3">
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formSocialMediaLink">
              <Form.Label style={{fontWeight: "500", fontSize: "13px"}}>Sosyal Medya Linki</Form.Label>
              <Form.Control
                type="url"
                {...formik.getFieldProps("socialMediaLink")}
                style={{borderRadius: "38px"}}
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
            <Form.Group className="mb-3" controlId="formSocialMediaName">
              <Form.Label style={{fontWeight: "500", fontSize: "13px"}}>Sosyal Medya Adı</Form.Label>
              <Form.Control
                type="text"
                style={{borderRadius: "38px"}}
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
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label style={{fontWeight: "500", fontSize: "13px"}}>Açıklama</Form.Label>
              <Form.Control
                type="text"
                style={{borderRadius: "38px"}}
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
          <Modal.Footer className="mb-3">
            <Button variant="secondary" onClick={handleCancel} style={{borderRadius: "34px", fontSize: "13px", fontWeight: "500", color: "#744BFC"}}>
              Vazgeç
            </Button>
            <Button variant="primary" type="submit" disabled={!(formik.dirty && formik.isValid) || loading} style={{borderRadius: "34px", fontSize: "13px", fontWeight: "500"}}>
            {loading && (
                <Spinner
                  animation="border"
                  size="sm"
                />
              )}{" "}Kaydet
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Datagrid;
