import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  onChange,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson} encType="multipart/form-data">
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark btn-block text-left text-center mt-3">
            {uploadButtonText}
            <input type="file" accept="video/*" onChange={onChange} hidden />
          </label>
          {!uploading && values.vedio && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
        <Button
          onClick={handleAddLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
          disabled={uploading || !values.title || !values.content}
        >
          {uploading ? "Uploading Vedio..." : "Save And Continue"}
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
