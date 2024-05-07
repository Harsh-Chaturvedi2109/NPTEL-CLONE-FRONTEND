import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Coursepage.css";

function Coursepage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const handleModuleClick = (module) => {
        setSelectedModule(module);

        // Set the first chapter when a module is clicked
        if (module.chapters?.length > 0) {
            setSelectedChapter(module.chapters[0]);
        }
    };

    const handleChapterClick = (chapter, event) => {
        event.stopPropagation(); // Prevent the module click event from triggering
        setSelectedChapter(chapter);
    };

    useEffect(() => {
        async function getCourse() {
            try {
                const res = await fetch(`http://localhost:80/course/getCourse/${courseId}`, {
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();

                if (res.ok) {
                    setCourse(data);

                    // Set the first module and the first chapter of that module
                    const firstModule = data.modules[0];
                    setSelectedModule(firstModule);
                    if (firstModule.chapters?.length > 0) {
                        setSelectedChapter(firstModule.chapters[0]);
                    }
                }
            } catch (err) {
                console.error("Error", err);
            }
        }
        getCourse();
    }, [courseId]);

    return (
        <>
            <Navbar />
            <div className="coursepage-container">
                <div className="tableofcontents">
                    <h1>Table of Contents</h1>
                    <ul>
                        {course?.modules.map((module, index) => (
                            <li key={module._id} onClick={() => handleModuleClick(module)}>
                                <h3>Module {index + 1}: {module.title}</h3>
                                <ul>
                                    {module.chapters?.map((chapter) => (
                                        <li
                                            key={chapter._id}
                                            onClick={(event) => handleChapterClick(chapter, event)}
                                            style={{
                                                cursor: "pointer",
                                                fontWeight: chapter === selectedChapter ? "bold" : "normal",
                                            }}
                                        >
                                            {chapter.title}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="coursepage-content">
                    <h1>{selectedChapter?.title}</h1>
                    {selectedChapter?.textContent && <p>{selectedChapter.textContent}</p>}
                    {selectedChapter?.videoContent && (
                        <iframe
                            src={selectedChapter.videoContent}
                            title={selectedChapter.title}
                            width="100%"
                            height="600px"
                        ></iframe>
                    )}
                </div>
            </div>
        </>
    );
}

export default Coursepage;
