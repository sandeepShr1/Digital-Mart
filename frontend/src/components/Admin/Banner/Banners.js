import React, { useEffect } from 'react';
import "../ProductList.css";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import { Link } from "react-router-dom";
// import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants"
import { Edit, Delete } from "@mui/icons-material"
import { Button } from '@mui/material';
import SideBar from "../Sidebar";
import { clearError, getBanner } from '../../../redux/actions/bannerActions';

const Banners = () => {
      const alert = useAlert();
      const dispatch = useDispatch();
      // const history = useNavigate();

      const { error, banners } = useSelector(state => state.banners)
      // const { error: deleteError, isDeleted } = useSelector(
      //       (state) => state.product
      // );


      // const deleteProductHandler = (id) => {
      //       dispatch(deleteProduct(id));
      // }

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            // if (deleteError) {
            //       alert.error(deleteError);
            //       dispatch(clearError());
            // }
            // if (isDeleted) {
            //       alert.success("Product Deleted Successfully");
            //       history("/admin/dashboard");
            //       dispatch({ type: DELETE_PRODUCT_RESET });
            // }

            dispatch(getBanner());
      }, [dispatch, alert, error]);

      const columns = [
            { field: "id", headerName: "Banner ID", minWidth: 200, flex: 0.5 },

            {
                  field: "product",
                  headerName: "Product",
                  minWidth: 350,
                  flex: 1,
            },
            {
                  field: "discount",
                  headerName: "Discount",
                  type: "number",
                  minWidth: 100,
                  flex: 0.3,
            },

            {
                  field: "largeText1",
                  headerName: "Large Text 1",
                  minWidth: 270,
                  flex: 0.5,
            },

            {
                  field: "actions",
                  flex: 0.3,
                  headerName: "Actions",
                  minWidth: 150,
                  type: "number",
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <>
                                    <Link to={`/admin/banner/${params.getValue(params.id, "id")}`}>
                                          <Edit />
                                    </Link>

                                    <Button
                                    // onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}
                                    >
                                          <Delete />
                                    </Button>
                              </>
                        );
                  },
            },
      ];

      const rows = [];

      banners &&
            banners.forEach((item) => {
                  rows.push({
                        id: item._id,
                        product: item.product,
                        largeText1: item.largeText1,
                        discount: item.discount,
                  });
            });

      return (
            <>
                  <MetaData title={`ALL PRODUCTS - Admin`} />

                  <div className="dashboard">
                        <SideBar />
                        <div className="productListContainer">
                              <h1 id="productListHeading">ALL BANNERS</h1>

                              <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    autoHeight
                              />
                        </div>
                  </div>
            </>
      )
}

export default Banners