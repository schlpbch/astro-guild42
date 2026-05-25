import unittest
from guild42 import ultimateAnswer


class TestUltimateAnswer(unittest.TestCase):
    def test_ultimate_answer_returns_42(self):
        """Test that ultimateAnswer returns the ultimate answer to life, the universe, and everything."""
        result = ultimateAnswer()
        self.assertEqual(result, 42)

    def test_ultimate_answer_is_integer(self):
        """Test that the result is an integer."""
        result = ultimateAnswer()
        self.assertIsInstance(result, int)


if __name__ == "__main__":
    unittest.main()
