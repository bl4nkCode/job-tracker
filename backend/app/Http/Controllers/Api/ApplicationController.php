<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
    // GET /api/applications  (optional: ?status=interview)
    public function index(Request $request): JsonResponse
    {
        $query = $request->user()
            ->applications()
            ->with('company:id,name,website');   // eager loading

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        return response()->json($query->latest()->get());
    }

    // POST /api/applications
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'company_id' => [
                'required',
                Rule::exists('companies', 'id')
                    ->where('user_id', $request->user()->id),
            ],
            'position' => ['required', 'string', 'max:255'],
            'status' => ['sometimes', 'required', Rule::in(Application::STATUSES)],
            'applied_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        // Creating through the relationship fills user_id automatically
        $application = $request->user()->applications()->create($data);

        return response()->json($application->fresh('company:id,name,website'), 201);
    }

    // GET /api/applications/{application}
    public function show(Request $request, Application $application): JsonResponse
    {
        $this->ensureOwner($request, $application);

        return response()->json($application->load('company:id,name,website'));
    }

    // PUT/PATCH /api/applications/{application}
    public function update(Request $request, Application $application): JsonResponse
    {
        $this->ensureOwner($request, $application);

        $data = $request->validate([
            'company_id' => [
                'sometimes',
                'required',
                Rule::exists('companies', 'id')
                    ->where('user_id', $request->user()->id),
            ],
            'position' => ['sometimes', 'required', 'string', 'max:255'],
            'status' => ['sometimes', 'required', Rule::in(Application::STATUSES)],
            'applied_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $application->update($data);

        return response()->json($application->load('company:id,name,website'));
    }

    // DELETE /api/applications/{application}
    public function destroy(Request $request, Application $application): JsonResponse
    {
        $this->ensureOwner($request, $application);

        $application->delete();

        return response()->json(['message' => 'Application deleted']);
    }

    // Stops a user from touching someone else's application
    private function ensureOwner(Request $request, Application $application): void
    {
        abort_if(
            $application->user_id !== $request->user()->id,
            403,
            'You do not own this application.'
        );
    }
}
