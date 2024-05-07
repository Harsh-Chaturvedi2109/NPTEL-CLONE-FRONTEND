import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    title: '',
    instructor: '',
    discipline: '',
    institute: '',
    modules: [
      {
        title: '',
        description: '',
        chapters: [
          {
            title: '',
            description: '',
            content: '',
            videoContent: '', 
          },
        ],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleModuleChange = (e, moduleIndex) => {
    const { name, value } = e.target;
    const newModules = [...courseData.modules];
    newModules[moduleIndex] = { ...newModules[moduleIndex], [name]: value };
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleChapterChange = (e, moduleIndex, chapterIndex) => {
    const { name, value } = e.target;
    const newModules = [...courseData.modules];
    newModules[moduleIndex].chapters[chapterIndex] = {
      ...newModules[moduleIndex].chapters[chapterIndex],
      [name]: value,
    };
    setCourseData({ ...courseData, modules: newModules });
  };

  const addModule = () => {
    const newModule = {
      title: '',
      description: '',
      chapters: [
        {
          title: '',
          description: '',
          content: '',
          videoContent: '', 
        },
      ],
    };

    setCourseData({
      ...courseData,
      modules: [...courseData.modules, newModule],
    });
  };

  const addChapter = (moduleIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].chapters.push({
      title: '',
      description: '',
      content: '',
      videoContent: '', // Initialize with an empty video URL
    });
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:80/course', courseData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      console.log('Course added:', response.data);
    } catch (err) {
      console.error('Error adding course:', err.message);
    }
  };

  return (
    <div>
      <h2>Add a Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Title:</label>
          <input type="text" name="title" value={courseData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Instructor:</label>
          <input type="text" name="instructor" value={courseData.instructor} onChange={handleChange} />
        </div>
        <div>
          <label>Discipline:</label>
          <input type="text" name="discipline" value={courseData.discipline} onChange={handleChange} />
        </div>
        <div>
          <label>Institute:</label>
          <input type="text" name="institute" value={courseData.institute} onChange={handleChange} />
        </div>

        {courseData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <label>Module Title:</label>
            <input type="text" name="title" value={module.title} onChange={(e) => handleModuleChange(e, moduleIndex)} />

            <label>Module Description:</label>
            <input type="text" name="description" value={module.description} onChange={(e) => handleModuleChange(e, moduleIndex)} />

            <button type="button" onClick={() => addChapter(moduleIndex)}>Add Chapter</button>

            {/* Chapter-related fields */}
            {module.chapters?.map((chapter, chapterIndex) => (
              <div key={chapterIndex}>
                <label>Chapter Title:</label>
                <input type="text" name="title" value={chapter.title} onChange={(e) => handleChapterChange(e, moduleIndex, chapterIndex)} />

                <label>Chapter Description:</label>
                <input type="text" name="description" onChange={(e) => handleChapterChange(e, moduleIndex, chapterIndex)} value={chapter.description} />

                <label>Chapter Content:</label>
                <textarea 
                  name="content" 
                  value={chapter.content} 
                  onChange={(e) => handleChapterChange(e, moduleIndex, chapterIndex)} 
                />
                
                <label>Video URL:</label>
                <input type="text" name="videoContent" value={chapter.videoContent} onChange={(e) => handleChapterChange(e, moduleIndex, chapterIndex)} />
              </div>
            ))}
          </div>
        ))}


        <button type="button" onClick={addModule}>Add Another Module</button>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
