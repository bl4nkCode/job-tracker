<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    // GET /api/companies
    public function index(Request $request): JsonResponse
    {
        $companies = $request->user()
            ->companies()
            ->withCount('applications')
            ->latest()
            ->get();

        return response()->json($companies);
    }

    // POST /api/companies
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        // Creating through the relationship fills user_id automatically
        $company = $request->user()->companies()->create($data);

        return response()->json($company, 201);
    }

    // GET /api/companies/{company}
    public function show(Request $request, Company $company): JsonResponse
    {
        $this->ensureOwner($request, $company);

        return response()->json($company->loadCount('applications'));
    }

    // PUT/PATCH /api/companies/{company}
    public function update(Request $request, Company $company): JsonResponse
    {
        $this->ensureOwner($request, $company);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $company->update($data);

        return response()->json($company);
    }

    // DELETE /api/companies/{company}
    public function destroy(Request $request, Company $company): JsonResponse
    {
        $this->ensureOwner($request, $company);

        $company->delete();

        return response()->json(['message' => 'Company deleted']);
    }

    // Stops a user from touching someone else's company
    private function ensureOwner(Request $request, Company $company): void
    {
        abort_if(
            $company->user_id !== $request->user()->id,
            403,
            'You do not own this company.'
        );
    }
}
