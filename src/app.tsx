import React, { useState } from 'react';
import { Button, Rows, TextInput, Select } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import { upload } from "@canva/asset";
import styles from "styles/components.css";

export const App = () => {
  const [objectDescription, setObjectDescription] = useState('');
  const [outputFormat, setOutputFormat] = useState('.gif');
  const [generating, setGenerating] = useState(false); // New state to handle generating status

  // Handles generating content
  const onGenerate = async () => {
    setGenerating(true); // Set generating status to true

    try {
      const response = await fetch('https://inaam.pythonanywhere.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: objectDescription }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Assume the response contains necessary data, including the URL to the generated GIF

      // Upload the generated GIF
      if (data.output && data.output[0] && data.output[0].endsWith('.gif')) {
        const result = await upload({
          type: "VIDEO",  // Ensure 'type' matches 'VIDEO'
          mimeType: "image/gif", // Correct MIME type for GIF
          url: data.output[0], // URL of the generated .gif file
          thumbnailImageUrl: data.output[0], // Using the same URL for the thumbnail
        });

        // Add generated GIF content as a native element
        await addNativeElement({
          type: "VIDEO",
          ref: result.ref,
        });
      } else {
        addNativeElement({
          type: "TEXT",
          children: ["Generated content will appear here!"], // Fallback message
        });
      }

    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGenerating(false); // Set generating status to false
    }
  };

  // Handles format change
  const handleFormatChange = (value: string) => {
    setOutputFormat(value);
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Rows spacing="1u">
          <label style={{ fontSize: "14px" }} htmlFor="object-description">Object Description [e.g: A red car]</label>
          <TextInput
            id="object-description"
            placeholder="Enter your prompt..."
            maxLength={140}
            value={objectDescription}
            onChange={(value: string) => setObjectDescription(value)} // Fix onChange handler for TextInput
          />
          <small style={{ fontSize: "10px" }}>Text to output .obj, .gif</small>
        </Rows>

        <Rows spacing="1u">
          <label style={{ fontSize: "14px" }} htmlFor="second-output-format">Select an Output Format</label>
          <Select
            id="second-output-format"
            placeholder="Select"
            stretch
            value={outputFormat}
            onChange={(value: string) => handleFormatChange(value)} // Fix onChange handler for Select
            options={[
              { value: ".gif", label: ".gif" },
              { value: ".obj", label: ".obj" },
            ]}
          />
        </Rows>

        <Rows spacing="1u">
          <Button variant="primary" onClick={onGenerate} stretch>
            {generating ? 'Generating...' : 'Generate'}
          </Button>
        </Rows>
      </Rows>
    </div>
  );
};
