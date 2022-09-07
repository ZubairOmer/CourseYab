import { Select, Button, Avatar } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  // handleImage,
  handleChange,
  values,
  setValues,
  imagePreview,
  uploadButtonText,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          cols="7"
          rows="7"
          value={values.description}
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <Select
              style={{ width: "100%" }}
              size="large"
              value={values.paid}
              onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
            >
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>
        </div>

        {values.paid && (
          <div className="form-group">
            <Select
              defaultValue="$9.99"
              style={{ widht: "100%" }}
              onChange={(v) => setValues({ ...values, price: v })}
              tokenSeparators={[,]}
              size="large"
            >
              {children}
            </Select>
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-row flex justify-content-center align-items-center">
        <div className="col mr-2">
          <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left">
              {uploadButtonText}
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
        {imagePreview && <Avatar shape="square" size={80} src={imagePreview} />}
      </div>

      <div className="row">
        <div className="col text-center mt-3 p-2">
          <Button
            onClick={handleSubmit}
            disabled={values.loading}
            className="btn btn-primary"
            loading={values.loading}
            type="primary"
            size="large"
            shape="round"
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CourseCreateForm;
