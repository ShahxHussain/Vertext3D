import React from 'react';
import { Button, Rows, TextInput, Select, FileInput } from "@canva/app-ui-kit";
import styles from "styles/components.css";

export const App = () => {
  const onGenerate = () => {
    // Add functionality for the Generate button
  };

  const onPreview = () => {
    // Add functionality for the Preview button
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <div>
          <label style={{fontSize:"14px"}}  htmlFor="object-description">Object Description</label>

          <TextInput
            id="object-description"
            placeholder="Enter your prompt..."
            maxLength={140}
            
          />
          <small style={{fontSize:"10px"}}>Text to output .obj, .ply, .gif</small>
        </div>
        <div>
          <label style={{fontSize:"14px"}} htmlFor="model-type">Select a Model Type</label>
          <Select id="model-type" placeholder="Select" stretch options={[
            { value: "model1", label: "Model 1", },
            { value: "model2", label: "Model 2" }
          ]} />
        </div>
        <div>
          <label style={{fontSize:"14px"}} htmlFor="output-format">Select an Output Format</label>
          <Select id="output-format" placeholder="Select" stretch options={[
            { value: ".obj", label: ".obj" },
            { value: ".ply", label: ".ply" },
            { value: ".gif", label: ".gif" },
          ]} />
        </div>
        <div>
          <label style={{fontSize:"14px"}} htmlFor="upload-image">Upload Image</label>

          <br></br>

          <FileInput stretchButton multiple  id="upload-image"  />
        </div>
        <div>
          <label style={{fontSize:"14px"}} htmlFor="second-output-format">Select an Output Format</label>
          <Select id="second-output-format" placeholder="Select" stretch options={[
            { value: "format1", label: "Format 1" },
            { value: "format2", label: "Format 2" }
          ]} />
        </div>
        <Button variant="primary" onClick={onGenerate} stretch>
          Generate
        </Button>
        <Button variant="secondary" onClick={onPreview} stretch>
          Preview
        </Button>
      </Rows>
    </div>
  );
};