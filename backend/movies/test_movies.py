from django.test import TestCase

from .models import Movie


class MovieTestCase(TestCase):
    @classmethod
    def setUp(self) -> None:
        self.movie_count = 25
        # Keep reference to first two movies
        self.m1: Movie = Movie.objects.create(title="Test 1")
        self.m2: Movie = Movie.objects.create(title="Test 2")

        # Create rest of movies
        for n in range(self.movie_count - 2):
            setattr(self, f'm{n+2}', Movie.objects.create(title=f"Test {n+2}"))

    def test_fetch_all_returns_correct_count(self) -> None:
        res = self.client.get(f"/movies/").json()

        self.assertEquals(res.get("count"), self.movie_count)

    def test_fetch_all_returns_correct_pagination(self) -> None:
        res = self.client.get(f"/movies/").json()

        self.assertEquals(len(res.get("results")), 20)
        self.assertIsNotNone(res.get("next"), "Expected two pages of results")

    def test_fetch_by_id(self) -> None:
        res = self.client.get(f"/movies/{self.m1.id}/").json()

        self.assertEquals(res.get("title"), self.m1.title)
        self.assertNotEquals(res.get("title"), self.m2.title)
