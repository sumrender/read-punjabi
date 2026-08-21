# read-punjabi

A browser app called **Read Punjabi** that teaches people to read Indian scripts. One product; Hindi is a secondary course inside it, not a separate product.

## Language

### Courses

**Course**:
One of the app's two learning tracks: Punjabi or Hindi. Selecting a course determines the script taught, the font used, the content served, and the storage prefix. There is exactly one active course per visitor, defaulting to Punjabi.
_Avoid_: language, mode, app

**Script**:
The writing system a course teaches: Gurmukhi for the Punjabi course, Devanagari for the Hindi course.

### Curriculum

**Level**:
A numbered stage of a course's curriculum (levels 1–5).

**Lesson**:
The instructional page of a level: an ordered list of Letters. Each level has one lesson.

**Letter**:
An atomic lesson item: a native glyph, its transliteration, and audio.
_Avoid_: character

**Transliteration**:
A Latin-letter rendering of a Letter's sound.

**Quiz**:
A numbered, graded set of questions attached to a level.

**Random Practice**:
Ungraded mixed practice drawn from a level's Letters.
