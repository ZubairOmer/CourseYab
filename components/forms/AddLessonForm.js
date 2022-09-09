import { Button, Progress } from "antd";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  onChange,
  progress,
}) => {
  console.log(values);
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson} encType="multipart/form-data">
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          values={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          values={values.content}
          placeholder="Content"
        ></textarea>

        <label className="btn btn-dark btn-block text-left mt-3">
          {/* {uploadButtonText} */}
          <input type="file" onChange={onChange} className="hidden" />
        </label>

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
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
